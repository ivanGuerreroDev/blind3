import {combineReducers} from 'redux';
import registroReducer from './registro'
import chatsReducer from './chats'
import userReducer from './user'

export default combineReducers({
  userReducer,
  registroReducer,
  chatsReducer
})