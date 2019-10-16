import {
    FETCH_DATA_ERROR,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
  } from '../constants/action-types';
  const initialState = {
    data: {},
  };
  
  
  export default function messagesReducer(state = initialState, action){
    
    switch (action.type) { 
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          data: action.data,
        }
      default:
        return state
    }
  }