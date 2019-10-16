import {
    FETCH_DATA_ERROR,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
  } from '../constants/action-types';
  const initialState = {
    loading: false,
    user: {},
  };
  
  
  export default function userReducer(state = initialState, action){
    
    switch (action.type) { 
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          user: action.user,
          loading: false
        }
      case FETCH_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case FETCH_DATA_ERROR:
        return {
          ...state,
          loading: false,
        }
      default:
        return state
    }
  }