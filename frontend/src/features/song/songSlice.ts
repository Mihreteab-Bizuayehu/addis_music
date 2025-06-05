import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Song, type SongFilters, type SongResponse, type Pagination } from "../../types/song";

interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  filters: SongFilters;
  selectedSong: Song | null;
  isCreateSuccessful: boolean;
  isUpdateSuccessful: boolean;
  isDeleteSuccessful: boolean
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  },
  filters: {
    page: 1,
    limit: 10,
  },
    selectedSong: null,
    isCreateSuccessful: false,
    isUpdateSuccessful: false,
    isDeleteSuccessful: false
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    fetchSongsRequest(state, action: PayloadAction<SongFilters>) {
      state.loading = true;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
      },
      
    fetchSongsSuccess(state, action: PayloadAction<SongResponse>) {
      state.loading = false;
      state.songs = action.payload.songs;
      state.pagination = action.payload.pagination;
      state.error = null;
      console.log('fetchSongsSuccess:', state.songs);
    },

    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchSongByIdRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },

    fetchSongByIdSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      state.error = null;
      state.selectedSong = action.payload;
    },

    fetchSongByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    selectSong(state, action: PayloadAction<Song>) {
      state.selectedSong = action.payload;
      },
    
    clearSelectedSong(state) {
      state.selectedSong = null;
      },
    
    createSongRequest(state, _action: PayloadAction<FormData>) {
      state.loading = true;
        state.error = null;
        state.isCreateSuccessful = false
      },
    
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.unshift(action.payload);
      state.pagination.total += 1;
      state.pagination.pages = Math.ceil(
        state.pagination.total / state.pagination.limit
      );
        state.loading = false;
        state.error = null;
        state.isCreateSuccessful = true
      },
    
    createSongFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.isCreateSuccessful = false
      state.error = action.payload;
      },
    
    updateSongRequest(
      state,
      _action: PayloadAction<{ id: string; formData: FormData }>
    ) {
      state.loading = true;
        state.error = null;
        state.isUpdateSuccessful = false
      },
    
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
        state.error = null;
        state.isUpdateSuccessful = true
      state.songs = state.songs.map((song) => {
        if (song._id === action.payload._id) {
          return action.payload;
        }
        return song;
      });
      if (state.selectedSong && state.selectedSong._id === action.payload._id) {
        state.selectedSong = action.payload;
      }
      },
    
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
        state.error = action.payload;
        state.isUpdateSuccessful = false
      },
    
      resetFormSubmissionFlags(state) {
        state.isCreateSuccessful = false;
        state.isUpdateSuccessful = false;
        state.isDeleteSuccessful = false;
        state.error = null;
        state.loading = false;
      },
    
    deleteSongRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.isDeleteSuccessful = false
      },
    
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.isDeleteSuccessful = true;
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      if (state.selectedSong && state.selectedSong._id === action.payload) {
        state.selectedSong = null;
      }
      state.pagination.total = Math.max(state.pagination.total - 1, 0);
      state.pagination.pages = Math.ceil(
        state.pagination.total / state.pagination.limit
      );
      },
    
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isDeleteSuccessful = false
    },
  },
});

export const {fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure, fetchSongByIdRequest, fetchSongByIdSuccess, fetchSongByIdFailure, selectSong, clearSelectedSong, createSongRequest, createSongSuccess, createSongFailure, updateSongRequest, updateSongSuccess, updateSongFailure, deleteSongRequest, deleteSongSuccess, deleteSongFailure, resetFormSubmissionFlags } = songSlice.actions;
export default songSlice.reducer;