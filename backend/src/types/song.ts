import { ParamsDictionary } from 'express-serve-static-core';
import { ETHIOPIAN_GENRES, ISong } from '../models/Song';

export interface Params extends ParamsDictionary {
  id: string;
}

// Type for song query filters
type RegexSearch = { $regex: string; $options: string };
export interface SongFilters {
  title?: string | RegexSearch;
  artist?: string | RegexSearch;
  album?: string | RegexSearch;
  genre?: (typeof ETHIOPIAN_GENRES)[number];
}

// Type for statistics response
export interface StatisticsResponse {
  totals: {
    songs: number;
    artists: number;
    albums: number;
    genres: number;
  };
  songsPerGenre: { genre: string; count: number }[];
  artistStats: {
    artist: string;
    songs: number;
    albumsCount: number;
    albums: string[];
  }[];
  albumStats: {
    artist: string;
    album: string;
    songs: number;
  }[];
  latestSongs: ISong[];
}


