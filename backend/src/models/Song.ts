import { Schema, model, Document } from 'mongoose';
import validator from 'validator';

export const ETHIOPIAN_GENRES = [
  'Amharic',
  'Tigrigna',
  'Oromo',
  'Gurage',
  'Eritrean',
  'Ethio-Jazz',
  'Ethio-Pop',
  'Ethio-HipHop',
  'Ethio-Reggae',
  'Bati',
  'Anchihoye',
  'Tizita',
  'Ambassel',
  'Tikur',
  'Eskista',
  'Krar',
  'Masinko',
  'Azmari',
  'Dawuro',
  'Wollo',
  'Gojjam',
  'Gonder',
  'Shewa',
  'Arba Minch',
  'Wolayta',
  'Sidama',
  'Afar',
  'Gumuz',
  'Benshangul',
  'Other',
] as const;

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
  audioUrl?: string;
  audioPublicId?: string;
  coverImageUrl?: string;
  coverImagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema = new Schema<ISong>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
      minlength: [1, 'Title cannot be empty'],
    },
    artist: {
      type: String,
      required: [true, 'Artist is required'],
      trim: true,
      maxlength: [100, 'Artist name cannot be more than 100 characters'],
    },
    album: {
      type: String,
      required: [true, 'Album is required'],
      trim: true,
      maxlength: [100, 'Album name cannot be more than 100 characters'],
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: {
        values: ETHIOPIAN_GENRES as readonly string[],
        message: '{VALUE} is not a supported genre',
      },
    },

    audioUrl: {
      type: String,
      validate: {
        validator: (value: string) =>
          validator.isURL(value, {
            protocols: ['http', 'https'],
            require_protocol: true,
          }),
        message: 'Audio URL must be a valid URL',
      },
    },
    audioPublicId: {
      type: String,
      select: false,
    },
    coverImageUrl: {
      type: String,
      validate: {
        validator: (value: string) =>
          validator.isURL(value, {
            protocols: ['http', 'https'],
            require_protocol: true,
          }),
        message: 'Cover image URL must be a valid URL',
      },
    },
    coverImagePublicId: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
SongSchema.index({
  title: 'text',
  artist: 'text',
  album: 'text',
  genre: 'text',
});
SongSchema.index({ artist: 1 });
SongSchema.index({ genre: 1 });

const Song = model<ISong>('Song', SongSchema);
export default Song;
