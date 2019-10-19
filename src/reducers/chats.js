import moment from 'moment';
import {
  DELETE_CHAT,
  RECIEVE_MESSAGE,
  ADD_MESSAGE,
  DELETE_ALL_CHAT
} from '../constants/action-types';
const initialState = {
  data: {},
  openeds: {},
  last_update: false
};
 

export default function chatsReducer(state = initialState, action){
  
  switch (action.type) { 
    case ADD_MESSAGE:
      var usuario1 = action.data.to;
      var mensaje1 = action.data;
      if(state.data && state.data[usuario1]){
        return {
          ...state, 
          data:{ ...state.data, [usuario1]: [...state.data[usuario1], mensaje1]},
          openeds: {
            ...state.openeds,
            [usuario1]: {
              usuario: usuario1,
              last_message: mensaje1.text,
              last_message_date: mensaje1.timestamp
            }
          },
          last_update: mensaje1.timestamp
        }
      }else{
        return {
          ...state, 
          data:{ ...state.data, [usuario1]: [mensaje1]},
          openeds: {
            ...state.openeds,
            [usuario1]: {
              usuario: usuario1,
              last_message: mensaje1.text,
              last_message_date: mensaje1.timestamp
            }
          },
          last_update: mensaje1.timestamp
        }
      }
    case RECIEVE_MESSAGE:
      var usuario2 = action.data.user;
      var mensaje2 = action.data;
      if(state.data && state.data[usuario2]){
        return {
          ...state, 
          data:{ ...state.data, [usuario2]: [...state.data[usuario2], mensaje2]},
          openeds: {
            ...state.openeds,
            [usuario2]: {
              usuario: usuario2,
              last_message: mensaje2.text,
              last_message_date: mensaje2.timestamp
            }
          },
          last_update: mensaje2.timestamp
        }
      }else{
        return {
          ...state, 
          data:{ ...state.data, [usuario2]: [mensaje2]},
          openeds: {
            ...state.openeds,
            [usuario2]: {
              usuario: usuario2,
              last_message: mensaje2.text,
              last_message_date: mensaje2.timestamp
            }
          }
        }
      }
    case DELETE_CHAT:
        delete state.data[action.data];
        delete state.openeds[action.data];
      return state
    case DELETE_ALL_CHAT:
      return {
        ...state,
        data: {},
        openeds: {},
        last_update: false
      }
    default:
      return state
  }
}