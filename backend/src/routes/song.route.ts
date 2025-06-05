import { Router } from 'express';
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  getStatistics,
  updateSong,
} from '../controllers/song.controller';
import upload from '../config/multer';

const songRoutes = Router();

songRoutes.post(
  '/',
  upload.fields([{ name: 'audioFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]),
  createSong
);

songRoutes.get('/', getAllSongs);

songRoutes.get('/statistics', getStatistics);

songRoutes.get('/:id', getSongById);

songRoutes.put(
  '/:id',
  upload.fields([{ name: 'audioFile' }, { name: 'imageFile' }]),
  updateSong
);

songRoutes.delete('/:id', deleteSong);


export default songRoutes;
