import {
    FETCH_DATA_ERROR,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    UPDATE_AVATAR,
    UPDATE_INFO
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
      case UPDATE_AVATAR:
        var avatar = action.user
        return {
          ...state,
          user: {...state.user, avatar},
        }
      case UPDATE_INFO:
        var value = action.user.value
        var key = action.user.key
        return {
          ...state,
          user: {...state.user, [key]:value},
        }
      default:
        return state
    }
  }