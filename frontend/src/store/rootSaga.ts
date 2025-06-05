import { all, fork } from 'redux-saga/effects';
import songSaga from '../features/song/songSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';

export default function* rootSaga() {
  yield all([fork(songSaga), fork(dashboardSaga)]);
}
