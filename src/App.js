import React from 'react';
import { Platform, StatusBar, View, AsyncStorage, StyleSheet } from 'react-native';
import AppNavigator from './navigations/AppNavigator';
import LoginNavigator from './navigations/LoginNavigator';
import { connect } from "react-redux";
import { fetchData } from "./actions/user";
import { recieveMessage, deleteChat } from "./actions/chats";
const io = require('socket.io-client');
var server = require('./config')

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
      this.socket.on('mensaje', function(data){
        aqui.props.recieveMessage(data);
      }) 
      this.socket.on('actualizacion', function(data){
        data.forEach(element => {
          aqui.props.recieveMessage(element);
        });
      }) 
    }
  }
  componentDidMount(){
  }
  render() {
    if(this.props.user&& this.props.user.username){
      return (
        <View style={styles.container}>
          <AppNavigator />
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
  loading: state.userReducer.loading
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