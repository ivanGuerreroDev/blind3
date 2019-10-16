import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";
var server = require('../config')
class AddChat extends React.Component {
  static navigationOptions = {
    title: 'Iniciar Conversacion',
    headerStyle: {
      backgroundColor: '#124734',
    },
    headerTintColor: '#fff',
  };
  state = {
  }
  componentDidMount(){
    this._refresh();
  }
  render() {
    return (
      <View style={styles.content}>
        {this.renderContacts()}
      </View>
    )
  }

  renderContacts(){
    var arr = []
    if(this.state.friends!=null && this.state.friends!=null && Object.keys(this.state.friends).length > 0){
      for (var [key, contact] of Object.entries(this.state.friends)) {
        arr.push(
          <TouchableOpacity 
            style={{
              flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 15,
              borderBottomWidth: 1, borderBottomColor: '#f4f4f4'
            }}
            onPress={() => this.props.screenProps._goChat(contact.username)}
          >
            <Image source={contact.avatar?contact.avatar:{uri: 'https://www.w3schools.com/w3images/avatar2.png'}} style={{
                alignSelf: 'center', 
                width: 60,
                borderRadius: 300,
                height: 60,
                resizeMode: 'contain',
                marginRight: 10,
            }}/>
            <View>
             
              <Text  style={{fontSize:20}}>{contact.username}</Text>
            </View>
            
          </TouchableOpacity>
        )
      }
      return arr
    }else{
      return null
    }
  }
  _refresh(){
    var aqui = this;
    fetch(server.host+'/api/friendList/', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.props.user.username,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        this.setState({friends: responseJson.list})
      }
    });
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },   
  button:{
    backgroundColor: '#fff', 
    width: 200, height: 40, 
    justifyContent:'center', alignItems: 'center',
    borderRadius: 10   
  },
  listItem: {
    paddingVertical: 20,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    width: '100%'
  }
});

function bindAction(dispatch) {
  return {
    fetchDataUser: user => dispatch(fetchDataSuccess(user))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});
export default connect(
  mapStateToProps,
  bindAction
)(AddChat);