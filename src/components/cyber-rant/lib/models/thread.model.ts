import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
  heartpulseCount: { type: Number, ref: 'Thread' },
  fireCount: { type: Number, ref: 'Thread' },
  thumbsDownCount: { type: Number, ref: 'Thread' },
  imageId: { type: String, ref: 'Thread' },
  imageUrl: { type: String, ref: 'Thread' },
});

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;
