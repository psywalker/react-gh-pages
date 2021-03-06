import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import { URL_FOR_LIKES } from '../constants';

export const processResponse = (response) => {
};

export const getParamsRequest = (photoId) => {
  const tokenFirst = window.localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${tokenFirst}`,
  };
  const axiosRequestPhotoLike = {
    method: 'post',
    url: URL_FOR_LIKES(photoId),
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
    },
    headers,
  };
  return axiosRequestPhotoLike;
};

const photoLike = photoId => axios(getParamsRequest(photoId)).then(processResponse);

export const api = {
  photoLike,
};

export function* photoLikeSaga(action) {
  const { photoId } = action;
  if (photoId) {
    try {
      const dataForProps = yield call(api.photoLike, photoId);
      yield put({ type: 'PHOTO_LIKE_SUCCESS', dataForProps });
    } catch (error) {
      //const errorRateLimit = get(error, 'response.data', '');
      //yield put({ type: 'PHOTO_LIKE_ERROR', errorRateLimit });
    }
  } else {
    const error = {};
    yield put({ type: 'PHOTO_LIKE_ERROR', error });
  }
}
