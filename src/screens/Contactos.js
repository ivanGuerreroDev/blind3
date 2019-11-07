import React, {Component} from 'react';
import { Text, View,ScrollView,StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import AddContactButton from '../components/AddContactButton'
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";
var server = require('../config')

class ContactosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: {},
      requests: {}
    }; 
  }
  componentDidMount(){
    this._refresh();
  }
  
  render() {
    return (
      <View style={{ flex: 1}}>
        <ScrollView>
          <View style={{ flex: 1, alignitems: 'center'}}>
            {this.renderRequests()}
          </View>
          <View style={{ flex: 1, alignitems: 'center'}}>
            {this.renderContacts()}
          </View>
        </ScrollView>
        <AddContactButton 
          screenProps={{
            _goAddContact: ()=>this.props.screenProps._goAddContact()
          }}
        />
      </View>
    );
  }

  renderContacts(){
    var arr = []
    if(this.state.friends!=null && this.state.friends!=null && Object.keys(this.state.friends).length > 0){
      for (var [key, contact] of Object.entries(this.state.friends)) {
        arr.push(
          <TouchableOpacity key={'contacto-'+key}
            style={{
              flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 15,
              borderBottomWidth: 1, borderBottomColor: '#f4f4f4'
            }}
            onPress={() => this.props.screenProps._goChat(contact.username)}
            onLongPress={()=>{
              Alert.alert('¿Deseas eliminar contacto?','',
                  [
                    {text: 'Si', onPress: () => {
                      this.deleteFriend(contact.username)
                    }},
                    {text: 'No',style: 'cancel',},
                  ],
                    {cancelable: true},
                  );
            }}
          >
            <Image source={contact.avatar?{uri: contact.avatar}:require('../assets/img/avatar2.png')} style={{
                alignSelf: 'center', 
                width: 60,
                borderRadius: 300,
                height: 60,
                resizeMode: 'contain',
                marginRight: 10,
            }}/>
            <View>
              <Text  style={{fontSize:20}}>{contact.nombresyapellidos?contact.nombresyapellidos:contact.username}</Text>
            </View>
          </TouchableOpacity>
        )
      }
      return arr
    }else{
      return null
    }
    
  }
  renderRequests(){
    var arr = []
    if(this.state.requests!=null && this.state.requests!=undefined && Object.keys(this.state.requests).length > 0){
      for (var [key, contact] of Object.entries(this.state.requests)) {
        arr.push(
          <View key={'request-'+key}
            style={{
              flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 15,
              borderBottomWidth: 1, borderBottomColor: '#f4f4f4'
            }}
          >
            <Image source={contact.avatar?{uri: contact.avatar}:require('../assets/img/avatar2.png')} style={{
                alignSelf: 'center', 
                width: 60,
                borderRadius: 300,
                height: 60,
                resizeMode: 'contain',
                marginRight: 10,
            }}/>
            <View>
              <Text  style={{fontSize:20}}>{contact.nombresyapellidos?contact.nombresyapellidos:contact.username}</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={()=>{this.addFriend(contact.username)}}
                >
                  <Text style={{color:"#fff"}}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={()=>{this.denyFriend(contact.username)}}
                >
                  <Text style={{color:"#fff"}}>Rechazar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }
      return arr
    }else{
      return null
    }
    
  }
  addFriend(friend){
    fetch(server.host+'/api/addFriend/', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.props.user.username,
        'friend': friend
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        this._refresh();
      }
    });
  }
  denyFriend(friend){
    fetch(server.host+'/api/denyFriend/', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.props.user.username,
        'friend': friend
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        this._refresh();
      }
    });

  }
  deleteFriend(friend){
    fetch(server.host+'/api/removeFriend/', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.props.user.username,
        'friend': friend
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        this._refresh();
      }
    });
  }
  _refresh(){
    var aqui = this;
    fetch(server.host+'/api/friendRequests/', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': aqui.props.user.username,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        
        this.setState({requests: responseJson.requests})
      }
    });
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
  button:{
    backgroundColor: '#124734', height: 40, paddingHorizontal:5, marginRight:10,
    justifyContent:'center', alignItems: 'center',
    borderRadius: 10   
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
)(ContactosScreen);