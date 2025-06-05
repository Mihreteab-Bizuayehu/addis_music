import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type StatisticsResponse } from '../../types/song';

interface DashboardState {
  statistics: StatisticsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  statistics: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchStatisticsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess(state, action: PayloadAction<StatisticsResponse>) {
      state.statistics = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
