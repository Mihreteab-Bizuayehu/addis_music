import {call, put, takeLatest} from 'redux-saga/effects';
import { fetchStatisticsRequest, fetchStatisticsSuccess, fetchStatisticsFailure} from './dashboardSlice';
import apiClient from '../../api/apiClient';
import type { StatisticsResponse } from '../../types/song';

export function* fetchDashboardSaga(_action: ReturnType<typeof fetchStatisticsRequest>) {
    try {
        const response: {data:StatisticsResponse} = yield call(apiClient.get, '/songs/statistics');
        yield put(fetchStatisticsSuccess(response.data));
        console.log(`fetchDashboardSaga: ${response.data}`);
    } catch (error: any) {
        yield put(fetchStatisticsFailure(error.message || 'An unknown error occurred'));
    }
}

export default function* dashboardSaga() {
    yield takeLatest(fetchStatisticsRequest.type, fetchDashboardSaga);
}