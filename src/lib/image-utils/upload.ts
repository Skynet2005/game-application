import packageData from '../../../package.json';
import dataUriToBuffer from '@/lib/image-utils/data-uri-to-buffer';
import cloudinary from 'cloudinary';

interface CloudinaryResult {
  secure_url: string;
}

// Initialize Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadFile(canvasData: string) {
  if (!canvasData) { throw new Error('Sketch Data URI is not defined'); }

  try {
    // Convert Data URI to Buffer
    const imageData = dataUriToBuffer(canvasData);

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryResult>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream({
        resource_type: 'image',
        public_id: `uploads/${packageData.name}/${packageData.version}/SketchNetic_input.png`,
        format: 'png',
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as CloudinaryResult);
        }
      });

      uploadStream.end(imageData);
    });

    return result.secure_url;
  } catch (error) {
    console.error('An error occurred:', error);
    throw new Error('Upload failed');
  }
}
