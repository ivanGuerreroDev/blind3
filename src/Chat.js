import React from 'react';
import { Platform, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import { addChat } from "./actions/chats";
import SlackMessage from './SlackMessage';
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "./actions/user";
import { addMessage } from "./actions/chats";
import moment from 'moment';

const io = require('socket.io-client');
var server = require('./config')

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props; 
    this.state = {
      messages: [],
      to: navigation.getParam('username')
    };
    
    const aqui = this
    this.socket = io(server.socket,{
      transports: ['websocket'],
      path: '/chat',
      query: {
        id: aqui.props.user.username,
        user: aqui.props.user.id
      } 
    });
  }
  static navigationOptions = ({ navigation })=>{
    return {
      title: navigation.getParam('username'),
      headerStyle: {
        backgroundColor: '#124734',
      },
      headerTintColor: '#fff'
    }
  };

  componentDidMount() {
    
    if(this.props.chats&&this.props.chats[this.state.to]){
      var mensajes = this.props.chats[this.state.to]
      if(mensajes){
        this._renderMensajes(mensajes);
      }
    }
   
  }
  _renderMensajes(mensajes){
    mensajes.forEach((element, i) => {
      var id = 1; var user = this.props.user.username;
      if(element.user != user){ id = 2; user = this.state.to }
      this.state.messages[i] = {
        _id: i,
        text: element.text,
        createdAt: element.timestamp,
        user:{
          _id: id,
          name: user,
        }
      };
    });
    this.setState({refresh: true})
  }
  onSend(messages = []) {
    var mensaje = {
      text: messages[0].text,
      user: this.props.user.username,
      to: this.state.to,
      timestamp: moment().utc().valueOf()
    };
    this.props.addMessage(mensaje)
    this.socket.emit('enviar', mensaje);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderMessage(props) {
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  renderSend(props) {
    return (
        <Send
            {...props}
        >
            <View style={{marginRight: 2, marginBottom: 0}}>
                <Image source={require('./assets/img/send-button.png')}  resizeMode={'center'}/>
            </View> 
        </Send>
    );
}

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        placeholder='Escribe un mensaje'
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderMessage={this.renderMessage}
        renderSend={this.renderSend}
        inverted={true}
      />
    );
  }

}
function bindAction(dispatch) {
  return {
    fetchDataUser: user => dispatch(fetchDataSuccess(user)),
    addMessage: data => dispatch(addMessage(data))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  chats: state.chatsReducer.data
});
export default connect(
  mapStateToProps,
  bindAction
)(Chat);
