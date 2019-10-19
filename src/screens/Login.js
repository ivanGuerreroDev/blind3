import React from 'react';
import { AsyncStorage, Platform, View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, YellowBox} from 'react-native';
import { Input } from 'react-native-elements';
import Loading from '../components/Loading';
import axios from 'axios';
import moment from 'moment';
import { connect } from "react-redux";

import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";

var server = require('../config')


class Login extends React.Component {
 
  static navigationOptions = {
    header: null,
  };
  state= {
    error: ''
  }
  render() {
    return (
      <View style={styles.content}>
        <Loading isLoading={ this.props.loading}/>
        <Image
          style={{
              marginBottom: 50, 
              alignSelf: 'center', 
              width: 226,
              height: 204,
              resizeMode: 'contain'
          }}
          source={require('../assets/img/logo-blanco.png')}
        />
        <Text style={{fontSize: 20, color:'#fff'}}>Iniciar sesión</Text>
        <Text style={{fontSize: 14, color:'red'}}>{this.state.error}</Text>
        <Input
          placeholder='Usuario'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.setState({username: e})}
        />
        <Input
          placeholder='Contraseña'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb'  
          onChangeText={(e)=>this.setState({password: e})}
          secureTextEntry={true}
        />
        <TouchableOpacity style={[styles.button, {marginTop:20}]}
          onPress={()=>{}}
        >
          <Text style={{fontSize: 16, color:'#333', fontWeight:'700'}}
            onPress={()=>this._login()}
          >INGRESAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:30}}
          onPress={() => this.props.navigation.navigate('OlvidoContrasena')}
        >
          <Text style={{fontSize: 16, color:'#fff'}}>¿Haz olvidado tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20}}
          onPress={() => this.props.navigation.navigate('Registro')}
        > 
          <Text style={{fontSize: 16, color:'#fff'}}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    ) 
  }

  
  _login(){
    const aqui=this
    aqui.props.requestDataUser();
    return fetch(server.host+'/api/login/', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.success){
        aqui.props.fetchDataUser(responseJson.user)
      }else{
        var msg;
        aqui.props.requestError()
        if(responseJson.error) msg=responseJson.error.message;
        if(responseJson.info) msg=responseJson.info.message;
        this.setState({error: msg})
      }
    })
    .catch((error) => {
      aqui.props.requestError()
      console.error(error);
    });
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: 30,
    backgroundColor: '#124734',
    justifyContent: 'center',
    alignItems: 'center'
  },   
  button:{
    backgroundColor: '#fff', 
    width: 200, height: 40, 
    justifyContent:'center', alignItems: 'center',
    borderRadius: 10   
  }
});

function bindAction(dispatch) {
  return {
    requestDataUser: user => dispatch(fetchDataRequest()),
    requestError: user => dispatch(fetchDataError()),
    fetchDataUser: user => dispatch(fetchDataSuccess(user))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  loading: state.userReducer.loading
});
export default connect(
  mapStateToProps,
  bindAction
)(Login);
