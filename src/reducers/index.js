import {combineReducers} from 'redux';
import registroReducer from './registro'
import chatsReducer from './chats'
import userReducer from './user'
import olvidoReducer from './olvido'

export default combineReducers({
  userReducer,
  registroReducer,
  chatsReducer,
  olvidoReducer
})