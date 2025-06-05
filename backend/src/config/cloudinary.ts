import { v2 as cloudinary } from 'cloudinary';
import env from './env';
import type { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File | undefined,
  folder: string
): Promise<{ url: string; publicId: string }> => {
  if (!file?.buffer) {
    throw new Error('Invalid file upload: Missing file data');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        timeout: 60000,
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        } else {
          reject(
            error || new Error('Cloudinary upload failed with unknown error')
          );
        }
      }
    );

    uploadStream.on('error', (err) => {
      reject(new Error(`Upload stream error: ${err.message}`));
    });

    uploadStream.end(file.buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete Cloudinary asset: ${result.result}`);
    }
  } catch (error) {
    throw new Error(
      `Cloudinary deletion error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

export default cloudinary;
