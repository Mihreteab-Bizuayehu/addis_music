import { combineReducers } from '@reduxjs/toolkit';
import songReducer from '../features/song/songSlice';
import playerReducer from '../features/player/playerSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

const rootReducer = combineReducers({
  song: songReducer,
  player: playerReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
