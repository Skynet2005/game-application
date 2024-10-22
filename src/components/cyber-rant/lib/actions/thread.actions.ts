'use server';
import { revalidatePath } from 'next/cache';
import { connectToDB } from '@/lib/mongoose';
import User from '../models/user.model';
import Thread from '../models/thread.model';
import Community from '@/components/cyber-rant/lib/models/community.model';
import uploadFile from '@/lib/image-utils/upload';

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
  imageFile: File | string | null;
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();
  const skipAmount = (pageNumber - 1) * pageSize;
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: User })
    .populate({ path: 'community', model: Community })
    .populate({ path: 'children', populate: { path: 'author', model: User, select: '_id name parentId image imageUrl' } });
  const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });
  const posts = await postsQuery.exec();
  const isNext = totalPostsCount > skipAmount + posts.length;
  return { posts, isNext };
}

export async function createThread({ text, author, communityId, path, imageFile }: Params) {
  await connectToDB();
  const communityIdObject = communityId ? await Community.findById(communityId) : null;
  const threadData = { text, author, community: communityIdObject?._id };
  const createdThread = await Thread.create(threadData);
  if (imageFile) {
    let fileUrl = "";
    if (typeof imageFile !== "string") {
      const dataURI = await fileToDataURI(imageFile as File);
      fileUrl = await uploadFile(dataURI);
    } else {
      fileUrl = imageFile;
    }
    await createdThread.updateOne({ imageUrl: fileUrl });
  }
  await User.findByIdAndUpdate(author, { $push: { threads: createdThread._id } });
  if (communityIdObject) {
    await Community.findByIdAndUpdate(communityIdObject._id, { $push: { threads: createdThread._id } });
  }
  revalidatePath(path);
}

function fileToDataURI(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function deleteThread(id: string, path: string): Promise<void> {
  connectToDB();
  const mainThread = await Thread.findById(id).populate('author community');
  if (!mainThread) throw new Error('Thread not found');
  const descendantThreads = await fetchAllChildThreads(id);
  const descendantThreadIds = [id, ...descendantThreads.map(thread => thread._id)];
  const uniqueAuthorIds = new Set([...descendantThreads.map(thread => thread.author?._id?.toString()), mainThread.author?._id?.toString()].filter(id => id !== undefined));
  const uniqueCommunityIds = new Set([...descendantThreads.map(thread => thread.community?._id?.toString()), mainThread.community?._id?.toString()].filter(id => id !== undefined));
  await Thread.deleteMany({ _id: { $in: descendantThreadIds } });
  await User.updateMany({ _id: { $in: Array.from(uniqueAuthorIds) } }, { $pull: { threads: { $in: descendantThreadIds } } });
  await Community.updateMany({ _id: { $in: Array.from(uniqueCommunityIds) } }, { $pull: { threads: { $in: descendantThreadIds } } });
  revalidatePath(path);
}

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId }).populate({ path: 'author', model: User, select: '_id id name parentId image' });
  const descendantThreads = [];
  for (const childThread of childThreads) {
    childThread.children = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread);
  }
  return descendantThreads;
}

export async function fetchThreadById(threadId: string) {
  connectToDB();
  const thread = await Thread.findById(threadId)
    .populate({ path: 'author', model: User, select: '_id id name image' })
    .populate({ path: 'community', model: Community, select: '_id id name image' });
  if (!thread) throw new Error('Thread not found');
  thread.children = await fetchAllChildThreads(threadId);
  return thread;
}

export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string) {
  connectToDB();
  const originalThread = await Thread.findById(threadId);
  if (!originalThread) throw new Error('Rant not found');
  const commentThread = new Thread({ text: commentText, author: userId, parentId: threadId });
  const savedCommentThread = await commentThread.save();
  originalThread.children.push(savedCommentThread._id);
  await originalThread.save();
  revalidatePath(path);
}

export async function updateReaction(threadId: string, userId: string, reactionType: string, increment: boolean, path: string) {
  connectToDB();
  const originalThread = await Thread.findById(threadId);
  if (!originalThread) throw new Error('Thread not found');
  const user = await User.findOne({ id: userId });
  if (!user) throw new Error('User not found');
  if (user.likedThreads && user.likedThreads.includes(threadId)) throw new Error('User has already liked this thread');
  const updateThreadQuery = increment ? { $inc: { [reactionType]: 1 } } : { $inc: { [reactionType]: -1 } };
  const updatedThread = await Thread.findByIdAndUpdate(threadId, updateThreadQuery, { new: true });
  if (increment) {
    await User.findOneAndUpdate({ clerkId: userId }, { $push: { reactions: { thread: threadId, type: reactionType } } });
  } else {
    await User.findOneAndUpdate({ clerkId: userId }, { $pull: { reactions: { thread: threadId, type: reactionType } } });
  }
  if (!path) return Response.json({ message: 'Missing path param' }, { status: 400 });
  revalidatePath(path);
  return {
    message: 'Reaction updated successfully',
    newCounts: { fireCount: updatedThread.fireCount, heartpulseCount: updatedThread.heartpulseCount, thumbsDownCount: updatedThread.thumbsDownCount }
  };
}
