import React from 'react';
import { Platform, StatusBar, View, AsyncStorage, StyleSheet, BackAndroid, Alert, AppState} from 'react-native';
import TouchID from 'react-native-touch-id';
import AppNavigator from './navigations/AppNavigator';
import LoginNavigator from './navigations/LoginNavigator';
import { connect } from "react-redux";
import { fetchData } from "./actions/user";
import { recieveMessage, deleteChat } from "./actions/chats";
const io = require('socket.io-client');
var server = require('./config')
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      loading: this.props.loading,
    };
    const aqui = this
    if(this.props.user && this.props.user.username ){
      console.log('socket conectado')
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
  componentDidMount(){
    const aqui = this
    AppState.addEventListener('change', this._handleAppStateChange);
    this.solicitarHuella()
    if(this.props.user&& this.props.user.username){
      console.log('actualizar:', this.props.user.username, this.props.last_update )
      this.socket.emit('conectar',{
        username: this.props.user.username,
        timestamp: this.props.last_update
      })
      this.socket.on('mensaje', function(data){
        aqui.props.recieveMessage(data);
      }) 
      this.socket.on('actualizacion', function(data){
        console.log('recibiendi act', data)
        data.forEach(element => {
          aqui.props.recieveMessage(element);
        });
      }) 
    }    
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.solicitarHuella()
    }
    this.setState({appState: nextAppState});
  };
  solicitarHuella(){
    TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      TouchID.authenticate('Comprobar identidad', optionalConfigObject)
      .then(success => {
        
      })
      .catch(error => {
        BackAndroid.exitApp();
      });
    })
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