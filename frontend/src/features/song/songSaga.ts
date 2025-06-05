import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure, fetchSongByIdRequest, fetchSongByIdSuccess, fetchSongByIdFailure, createSongRequest, createSongSuccess, createSongFailure, updateSongRequest, updateSongSuccess, updateSongFailure, deleteSongRequest, deleteSongSuccess, deleteSongFailure } from "./songSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/apiClient";
import { type SongResponse, type Song } from "../../types/song";

function* fetchSongsSaga(action: ReturnType<typeof fetchSongsRequest>) {
    try {
        const response: {data:SongResponse} = yield call(apiClient.get, '/songs' , { params: action.payload });
        yield put(fetchSongsSuccess(response.data));
        console.log(`fetchSongsSaga: ${response.data}`);
    } catch (error: any) {
        yield put(fetchSongsFailure(error.message || 'An unknown error occurred'));
    }
}

function* fetchSongByIdSaga(action: ReturnType<typeof fetchSongByIdRequest>) {
    try {
        const response: {data:Song} = yield call(apiClient.get, `/songs/${action.payload}`);
        yield put(fetchSongByIdSuccess(response.data));
    } catch (error: any) {
        yield put(fetchSongByIdFailure(error.message || 'An unknown error occurred'));
    }
}

function* createSongSaga(action: ReturnType<typeof createSongRequest>) {
  try {
    const formData = action.payload;
    const response: { data: Song } = yield call(
      apiClient.post,
      '/songs',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    yield put(createSongSuccess(response.data));
  } catch (error: any) {
    yield put(createSongFailure(error.message || 'Failed to create song'));
  }
}
  

function* updateSongSaga(action: ReturnType<typeof updateSongRequest>) {
    try {
        const response: {data:Song} = yield call(apiClient.put, `/songs/${action.payload.id}`, action.payload.formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        yield put(updateSongSuccess(response.data));
    } catch (error: any) {
        yield put(updateSongFailure(error.message || 'An unknown error occurred'));
    }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSongRequest>) {
    try {
        yield call(apiClient.delete, `/songs/${action.payload}`);
        yield put(deleteSongSuccess(action.payload));
    } catch (error: any) {
        yield put(deleteSongFailure(error.message || 'An unknown error occurred'));
    }
}

export default function* songSaga() {
    yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
    yield takeLatest(fetchSongByIdRequest.type, fetchSongByIdSaga);
    yield takeLatest(createSongRequest.type, createSongSaga);
    yield takeLatest(updateSongRequest.type, updateSongSaga);
    yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}