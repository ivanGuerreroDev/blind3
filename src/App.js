import React from 'react';
import {  View,  StyleSheet} from 'react-native';

import AppNavigator from './navigations/AppNavigator';
import LoginNavigator from './navigations/LoginNavigator';
import { connect } from "react-redux";
import { fetchData } from "./actions/user";
import { recieveMessage, deleteChat } from "./actions/chats";

var PushNotification = require("react-native-push-notification");
const io = require('socket.io-client');
var server = require('./config');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      loading: this.props.loading,
    };
    const aqui = this
    if(this.props.user && this.props.user.username ){
      this.socket = io(server.socket,{
        transports: ['websocket'],
        path: '/chat',
        query: {
          id: aqui.props.user.username,
          user: aqui.props.user.id
        } 
      });
      
    }
  }
  async componentDidMount(){
    const aqui = this
    if(this.props.user&& this.props.user.username){
      PushNotification.configure({
        onRegister: function(token) {
          console.log("TOKEN:", token);
        },
        onNotification: function(notification) {
          console.log("NOTIFICATION:", notification);
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        popInitialNotification: true,
        requestPermissions: true
      });
      this.socket.emit('conectar',{
        username: this.props.user.username,
        timestamp: this.props.last_update
      })
      this.socket.on('mensaje', function(data){
        
        PushNotification.localNotification({
          title: data.user+' te ha enviado:',
          message: data.text
        })
        
        aqui.props.recieveMessage(data);
      }) 
      this.socket.on('actualizacion', function(data){
        data.forEach(element => {
          aqui.props.recieveMessage(element);
        });
      }) 
    }    
  }
  render() {
    if(this.props.user&& this.props.user.username){
      return (
        <View style={styles.container}>
          <AppNavigator 
            screenProps={{
              sendMessage: (mensaje)=> this.socket.emit('enviar', mensaje)
            }}
          />
        </View>        
      );
    }else{
      return (
        <View style={styles.container}>
          <LoginNavigator/>
        </View>
      );
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },   
});


const mapStateToProps = state => ({
  user: state.userReducer.user,
  loading: state.userReducer.loading,
  last_update: state.chatsReducer.last_update,
  chats: state.chatsReducer.data,
});
function bindAction(dispatch) {
  return {
    fetchData: user => dispatch(fetchData(user)),
    recieveMessage: data => dispatch(recieveMessage(data)),
    deleteChat: data => dispatch(deleteChat(data))
  };
}
export default connect(
  mapStateToProps, bindAction
)(App);