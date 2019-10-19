import { FETCH_DATA_SUCCESS, FETCH_DATA_REQUEST, FETCH_DATA_ERROR, UPDATE_AVATAR, UPDATE_INFO } from '../constants/action-types';

export const fetchDataSuccess = user => (
  {
    type: FETCH_DATA_SUCCESS,
    user
  }
);
export const updateInfo = user => (
  {
    type: UPDATE_INFO,
    user
  }
);
export const updateAvatar = user => (
  {
    type: UPDATE_AVATAR,
    user
  }
);
export const fetchDataRequest = user => (
  {
    type: FETCH_DATA_REQUEST
  }
);
export const fetchDataError = user => (
  {
    type: FETCH_DATA_ERROR
  }
);
export const fetchData = (user) => {
  return (dispatch) => {
    return dispatch(fetchDataSuccess(user))
  }
};