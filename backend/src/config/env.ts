import dotenv from 'dotenv';

dotenv.config();

interface Env {
  PORT: number;
  MONGODB_URI: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const env: Env = {
  PORT: parseInt(process.env.PORT || '3000'),
  MONGODB_URI: process.env.MONGO_URI || '',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};

export default env;
