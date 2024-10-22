//src/app/api/uploadthing/core.ts

// Resource: https://docs.uploadthing.com/nextjs/appdir#creating-your-first-fileroute
// Above resource shows how to setup uploadthing. Copy paste most of it as it is.
// Changing a few things in the middleware and configs of the file upload i.e., "media", "maxFileCount"
import { currentUser, auth } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const getUser = async () => await currentUser();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
}

class UnauthorizedError extends Error { constructor(message: string) { super(message); this.name = "UnauthorizedError"; } }
class InternalServerError extends Error { constructor(message: string) { super(message); this.name = "InternalServerError"; } }

export const ourFileRouter = {
  media: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async req => {
      try {
        const user = await getUser();
        if (!user) throw new UnauthorizedError('User not authenticated');
        return { userId: user.id };
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Media Middleware Error:', error.message, 'Error Type:', error.name);
        }
        throw new InternalServerError('Failed to process media upload');
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log('Upload complete for userId:', metadata.userId);
        console.log('file url', file.url);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Media Upload Complete Error:', error.message, 'Error Type:', error.name);
        }
      }
    }),

  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

