import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Song } from "../../types/song";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Song[];
  currentIndex: number;
}

const savedSong = localStorage.getItem('currentSong');
const parsedSong: Song | null = savedSong ? JSON.parse(savedSong) : null;

const initialState: PlayerState = {
  currentSong: parsedSong,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  queue: [],
  currentIndex: -1,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
    reducers: {
      playSong: (state, action: PayloadAction<{ song: Song; queue?: Song[] }>) => {
            state.currentSong = action.payload.song;
            state.isPlaying = true;
            state.currentTime = 0;
            if (action.payload.queue) {
                state.queue = action.payload.queue;
                let foundIndex = state.queue.findIndex(index => index._id === action.payload.song._id)
                if (foundIndex === -1) {
                    state.queue.unshift(action.payload.song);
                    state.currentIndex = 0;
                } else {
                    state.currentIndex = foundIndex;
                }
            }
            else {
                state.queue = [action.payload.song];
                state.currentIndex = 0;
            }
            localStorage.setItem('currentSong', JSON.stringify(action.payload.song));
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
        pauseSong(state) {
            state.isPlaying = false;
        },
        resumeSong(state) {
            state.isPlaying = true;
        },
        nextSong(state) {
            if(state.queue.length===0) return;
            const nextIndex = (state.currentIndex + 1) % state.queue.length;
            state.currentIndex = nextIndex;
            state.currentSong = state.queue[nextIndex];
            state.isPlaying = true;
            state.currentTime = 0;
        },
        prevSong(state) {
            if(state.queue.length===0) return;
            const prevIndex = (state.currentIndex - 1 + state.queue.length) % state.queue.length;
            state.currentIndex = prevIndex;
            state.currentSong = state.queue[prevIndex];
            state.isPlaying = true;
            state.currentTime = 0;
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
        clearPlayer(state) {
            state.currentSong = null;
            state.isPlaying = false;
            state.currentTime = 0;
            state.duration = 0;
            state.volume = 0.7;
            state.queue = [];
            state.currentIndex = -1;
            localStorage.removeItem('currentSong');
        }
  },
});

export const { playSong, togglePlay, pauseSong, resumeSong, nextSong, prevSong, setCurrentTime, setDuration, setVolume, clearPlayer  } = playerSlice.actions;

export default playerSlice.reducer;

