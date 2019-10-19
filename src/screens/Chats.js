import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Alert  } from 'react-native';
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";
import { addMessage,deleteChat, recieveMessage } from "../actions/chats";
import AddChatButton from "../components/AddChatButton";
var moment = require('moment');
const io = require('socket.io-client');
var server = require('../config')
import 'moment/locale/es';

class ChatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: {}
    };
    this.renderChats = this.renderChats.bind(this);
    const aqui = this
  }
  static getDerivedStateFromProps(props, state) {
    return{
      chats: props.chats
    }
  }
  componentDidMount(){
    const aqui = this
    this.setState({chats: this.props.chats})
  }
  renderChats(){
    var chats = this.state.chats;
    var chatComponents = []
    if(chats){
      if(Object.keys(chats).length > 0){ 
        for (var [key, chat] of Object.entries(chats)) {
          chatComponents.push(
            <TouchableOpacity 
              style={{
                flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 15,
                borderBottomWidth: 1, borderBottomColor: '#f4f4f4'
              }}
              onPress={() => this.props.screenProps._goChat(chat.usuario)}
              onLongPress={
                ()=>{
                  Alert.alert('¿Deseas eliminar la conversación?','',
                  [
                    {text: 'Si', onPress: () => {
                      this.props.deleteChat(chat.usuario);
                      this.setState({refresh: true})
                    }},
                    {text: 'No',style: 'cancel',},
                  ],
                    {cancelable: true},
                  );
                }
              }
            >
              <Image source={chat.avatar?{uri: chat.avatar}:require('../assets/img/avatar2.png')} style={{
                  alignSelf: 'center', 
                  width: 60,
                  borderRadius: 300,
                  height: 60,
                  resizeMode: 'contain',
                  marginRight: 10,
              }}/>
              <View>
               
                <Text  style={{fontSize:20}}>{chat.usuario}</Text>
                <Text style={{color:'#5e5f5d'}}>{chat.last_message}</Text>
              </View>
              
            </TouchableOpacity>
          )
        }
        return chatComponents
      }else{
        return null
      }
    }
    
    
  }
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <View style={{ flex: 1, alignitems: 'center'}}>
            {this.renderChats()}
          </View>
          
        </ScrollView>
      </View>
      
      
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchDataUser: user => dispatch(fetchDataSuccess(user)),
    addMessage: data => dispatch(addMessage(data)),
    recieveMessage: data => dispatch(recieveMessage(data)),
    deleteChat: data => dispatch(deleteChat(data))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  chats: state.chatsReducer.openeds
});
export default connect(
  mapStateToProps,
  bindAction
)(ChatsScreen);

