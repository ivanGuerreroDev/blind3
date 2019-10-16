import { DELETE_CHAT, ADD_MESSAGE, RECIEVE_MESSAGE } from '../constants/action-types';

export const deleteChat = data => (
  {
    type: DELETE_CHAT,
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