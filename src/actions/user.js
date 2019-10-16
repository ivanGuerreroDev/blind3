import { FETCH_DATA_SUCCESS, FETCH_DATA_REQUEST, FETCH_DATA_ERROR } from '../constants/action-types';

export const fetchDataSuccess = user => (
  {
    type: FETCH_DATA_SUCCESS,
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