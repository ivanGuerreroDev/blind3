import React from 'react';
import {  View,  StyleSheet, BackHandler,AppState} from 'react-native';
import Oculto from './components/Oculto';
import AppNavigator from './navigations/AppNavigator';
import LoginNavigator from './navigations/LoginNavigator';
import { connect } from "react-redux";
import { fetchData } from "./actions/user";
import { recieveMessage, deleteChat } from "./actions/chats";
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Authentication Requerida', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Toca el sensor de huella', // Android
  sensorErrorDescription: 'Fallo', // Android
  cancelText: 'Cancelar', // Android
  fallbackLabel: 'Mostrar codigo', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

var PushNotification = require("react-native-push-notification");
const io = require('socket.io-client');
var server = require('./config');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      loading: this.props.loading,
      oculto:false
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
    this.setState({oculto:true})
    AppState.addEventListener('change', this._handleAppStateChange);
    if(this.props.user&& this.props.user.username){
      this.solicitarHuella();
      PushNotification.configure({
        onRegister: function(token) {
          console.log("TOKEN:", token);
        },
        onNotification: function(notification) {
          console.log("NOTIFICATION:", notification);
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
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  solicitarHuella(){
    TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      TouchID.authenticate('Comprobar identidad', optionalConfigObject)
      .then(success => {
        this.setState({oculto:false})
      })
      .catch(error => {
        BackHandler.exitApp();
      });
    }).catch(error => {
      this.setState({oculto:false})
    });
  }
  _handleAppStateChange = (nextAppState) => {
    if ((nextAppState === 'active') && this.props.user && this.props.user.username) {
      console.log('hola')
      this.setState({oculto:true})
      this.solicitarHuella()
    }
  };
  render() {
    if(this.props.user&& this.props.user.username){
      if(this.state.oculto){
        return (
          <View style={{flex:1}}>
            <Oculto />
          </View>
        )
      }else{
        return (
          <View style={styles.container}>
            <AppNavigator 
              screenProps={{
                sendMessage: (mensaje)=> this.socket.emit('enviar', mensaje)
              }}
            />
          </View>        
        );
      }
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