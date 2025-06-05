import Song, { ETHIOPIAN_GENRES } from '../models/Song';
import type { NextFunction, Request, Response } from 'express';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import validator from 'validator';
import handleError from '../utils/handleError';
import { Params, SongFilters, StatisticsResponse } from '../types/song';

export const createSong = async (req: Request, res: Response, next: NextFunction) => {
  
  let audioResult, imageResult;
  try {
    const { title, artist, album, genre } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    const audioFile = files?.audioFile?.[0];
    const imageFile = files?.imageFile?.[0];

    if (!title || !artist || !album || !genre) {
      res.status(400).json({
        error:
          'Missing required song information: title, artist, album, and genre are required.',
      });
      return;
    }

    if (!audioFile) {
      res.status(400).json({ error: 'Audio file is required.' });
      return;
    }

    if (!imageFile) {
      res.status(400).json({ error: 'Image file is required.' });
      return;
    }

    if (!ETHIOPIAN_GENRES.includes(genre)) {
      res.status(400).json({
        error: 'Invalid genre provided.',
        supportedGenres: ETHIOPIAN_GENRES,
      });
      return;
    }

    [audioResult, imageResult] = await Promise.all([
      uploadToCloudinary(audioFile, 'addis-music/audios'),
      uploadToCloudinary(imageFile, 'addis-music/images'),
    ]);

    const song = await Song.create({
      title: validator.escape(title),
      artist: validator.escape(artist),
      album: validator.escape(album),
      genre,
      audioUrl: audioResult.url,
      audioPublicId: audioResult.publicId,
      coverImageUrl: imageResult.url,
      coverImagePublicId: imageResult.publicId,
    });

    res.status(201).json({
      song,
      message: 'Song created successfully.',
    });
    return;
  } catch (error) {
    next(handleError(error, 'Failed to create song.'));
  }
};

export const getAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, artist, album, genre, page = '1', limit = '10' } = req.query;

    const filters: SongFilters = {};

    if (title) filters.title = { $regex: title as string, $options: 'i' };
    if (artist) filters.artist = { $regex: artist as string, $options: 'i' };
    if (album) filters.album = { $regex: album as string, $options: 'i' };
    if (
      genre &&
      ETHIOPIAN_GENRES.includes(genre as (typeof ETHIOPIAN_GENRES)[number])
    ) {
      filters.genre = genre as (typeof ETHIOPIAN_GENRES)[number];
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const songs = await Song.find(filters)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Song.countDocuments(filters);

    const responseData = {
      songs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    };

    res.status(200).json(responseData);
    return;
  } catch (error) {
    next(handleError(error, 'Error fetching songs'));
  }
};

export const getSongById = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (!song) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }

    res.status(200).json(song);
    return;
  } catch (error) {
    next(handleError(error, 'Error fetching song by id'));
  }
};

export const updateSong = async (req: Request<Params>, res: Response, next: NextFunction) => {
   try {
    const { id } = req.params;
    const { title, artist, album, genre } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    const audioFile = files?.audioFile?.[0];
    const imageFile = files?.imageFile?.[0];

    const song = await Song.findById(id);
    if (!song) {
      res.status(404).json({ error: 'Song not found.' });
      return;
    }

     const updateData: Partial<typeof song> = {}; 
     
    if ('title' in req.body && title !== undefined)
      updateData.title = validator.escape(title);
    if ('artist' in req.body && artist !== undefined)
      updateData.artist = validator.escape(artist);
    if ('album' in req.body && album !== undefined)
      updateData.album = validator.escape(album);

    if ('genre' in req.body && genre !== undefined) {
      if (
        !ETHIOPIAN_GENRES.includes(genre as (typeof ETHIOPIAN_GENRES)[number])
      ) {
        res.status(400).json({
            error: 'Invalid genre provided.',
            supportedGenres: ETHIOPIAN_GENRES,
          });
        return;
      }
      updateData.genre = genre;
    }

    const cloudinaryDeletionPromises: Promise<any>[] = [];

    if (audioFile) {
      if (song.audioPublicId) {
        cloudinaryDeletionPromises.push(
          deleteFromCloudinary(song.audioPublicId)
        );
      }
      const audioResult = await uploadToCloudinary(
        audioFile,
        'addis-music/audios'
      );
      updateData.audioUrl = audioResult.url;
      updateData.audioPublicId = audioResult.publicId;
    }

    if (imageFile) {
      if (song.coverImagePublicId) {
        cloudinaryDeletionPromises.push(
          deleteFromCloudinary(song.coverImagePublicId)
        );
      }
      const imageResult = await uploadToCloudinary(
        imageFile,
        'addis-music/images'
      );
      updateData.coverImageUrl = imageResult.url;
      updateData.coverImagePublicId = imageResult.publicId;
    }

    await Promise.all(cloudinaryDeletionPromises);

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'No update data provided.' });
      return;
    }

    const updatedSong = await Song.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSong) {
      res.status(404).json({ error: 'Song not found after attempted update.' });
      return;
    }

     res.status(200).json({
       updatedSong,
      message: 'Song updated successfully.',
    });
    return;
  } catch (error) {
    next(handleError(error, 'Failed to update song.'));
  }
};

export const deleteSong = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }

    if (song.audioPublicId) {
      await deleteFromCloudinary(song.audioPublicId);
    }
    
    if (song.coverImagePublicId) {
      await deleteFromCloudinary(song.coverImagePublicId);
    }

    res.status(200).json({
      message: 'Song deleted successfully',
    });
    return;
  } catch (error) {
    next(handleError(error, 'Error deleting song'));
  }
};

export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [
      totalSongs,
      artists,
      albums,
      genres,
      songsPerGenre,
      artistStats,
      albumStats,
      latestSongs,
    ] = await Promise.all([
      Song.countDocuments(),
      Song.distinct('artist'),
      Song.distinct('album'),
      Song.distinct('genre'),
      Song.aggregate([
        { $match: { genre: { $exists: true } } },
        { $group: { _id: '$genre', count: { $sum: 1 } } },
        { $project: { _id: 0, genre: '$_id', count: 1 } },
      ]),
      Song.aggregate([
        { $match: { artist: { $exists: true } } },
        {
          $group: {
            _id: '$artist',
            songs: { $sum: 1 },
            albums: { $addToSet: '$album' },
          },
        },
        {
          $project: {
            artist: '$_id',
            _id: 0,
            songs: 1,
            albumsCount: { $size: '$albums' },
          },
        },
      ]),
      Song.aggregate([
        { $match: { album: { $exists: true }, artist: { $exists: true } } },
        {
          $group: {
            _id: { album: '$album', artist: '$artist' },
            songs: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            album: '$_id.album',
            artist: '$_id.artist',
            songs: 1,
          },
        },
      ]),
      Song.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const statistics: StatisticsResponse = {
      totals: {
        songs: totalSongs,
        artists: artists.length,
        albums: albums.length,
        genres: genres.length,
      },
      latestSongs,
      songsPerGenre,
      artistStats,
      albumStats,
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error('Statistics Error:', error);
    next(handleError(error, 'Error getting statistics'));
  }
};


