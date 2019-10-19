import {
  SET_DATA_REGISTER
} from '../constants/action-types';
const initialState = {
  'nombreyapellido': null,
  'username': null,
  'email': null,
  'autorizacion': null,
  'codigo': null,
  'password': null
};


export default function registroReducer(state = initialState, action){
  
  switch (action.type) { 
    case SET_DATA_REGISTER:
      return {
        ...state,
        [action.data]: action.value,
      }
    default:
      return state
  }
}