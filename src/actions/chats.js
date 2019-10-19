import { DELETE_CHAT, ADD_MESSAGE, RECIEVE_MESSAGE, DELETE_ALL_CHAT } from '../constants/action-types';

export const deleteChat = data => (
  {
    type: DELETE_CHAT,
    data
  }
); 
export const deleteAll = data => (
  {
    type: DELETE_ALL_CHAT,
    data
  }
); 
export const addMessage = data => (
  {
    type: ADD_MESSAGE,
    data
  }
);
export const recieveMessage = data => (
  {
    type: RECIEVE_MESSAGE,
    data
  }
);