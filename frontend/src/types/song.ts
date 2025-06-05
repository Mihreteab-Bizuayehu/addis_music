import type { SelectChangeEvent  } from "@mui/material";

export type StatisticsResponse = {
  totals: {
    songs: number;
    artists: number;
    albums: number;
    genres: number;
  };
  songsPerGenre: Array<{ genre: string; count: number }>;
  artistStats: Array<{
    artist: string;
    songs: number;
    albumsCount: number;
  }>;
  albumStats: Array<{
    artist: string;
    album: string;
    songs: number;
  }>;
  latestSongs: Song[];
};

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

export interface SongFilters {
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
  page: number;
  limit: number;
}

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  audioUrl: string;
  audioPublicId: string;
  coverImageUrl: string;
  coverImagePublicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface SongResponse {
  songs: Song[];
  pagination: Pagination;
}

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement 
> | SelectChangeEvent ;
export interface SongFilterProps {
  filters: {
    title: string;
    artist: string;
    album: string;
    genre: string;
    page: number;
    limit: number;
  };
  onFilterChange: (
    e: InputChangeEvent
  ) => void;
}


