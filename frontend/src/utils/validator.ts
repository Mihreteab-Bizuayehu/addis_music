import { z } from 'zod';
import { ETHIOPIAN_GENRES } from '../types/song';

export const songFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  artist: z.string().min(1, 'Artist is required').max(100),
  album: z.string().min(1, 'Album is required').max(100),
  genre: z.enum(ETHIOPIAN_GENRES),
  audioFile: z.instanceof(File).optional(),
  imageFile: z.instanceof(File).optional(),
});

export type SongFormValues = z.infer<typeof songFormSchema>;
