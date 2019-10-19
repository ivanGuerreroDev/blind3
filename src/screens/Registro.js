import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";
import { setDataRegistro} from "../actions/registro";
var server = require('../config')
class Registro extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state= {
    error: ''
  }
  render() {
    return (
      <View style={styles.content}>
        
        <Text style={{fontSize: 20, color:'#fff', marginBottom:30, textAlign:'center'}}>Registro</Text>
        <Text style={{fontSize: 14, color:'red'}}>{this.state.error}</Text>
        <Input
          placeholder='Nombre Completo'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.props.setDataRegistro({input: 'nombreyapellido', value: e})}
        />
        <Input
          placeholder='Usuario'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.props.setDataRegistro({input: 'username', value: e})}
        />
        <Input
          placeholder='Correo Electrónico'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.props.setDataRegistro({input: 'email', value: e})}
        />
        <TouchableOpacity style={[styles.button, {marginTop:20}]}
          onPress={() => this._confirmarCorreo()}
        >
          <Text style={{fontSize: 16, color:'#333', fontWeight:'700'}}>SIGUIENTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:30}}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={{fontSize: 16, color:'#fff'}}>Volver</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _confirmarCorreo(){
    return fetch(server.host+'/api/permission/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.props.registro.email,
        'type': 'Creation'
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.valid){
        this.props.navigation.navigate('ConfirmarCorreo');
      }else{
        var msg;
        if(responseJson.message) msg=responseJson.message;
        this.setState({error: msg})
      }
    })
    .catch((error) => {
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
    setDataRegistro: data => dispatch(setDataRegistro(data))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  registro: state.registroReducer
});
export default connect(
  mapStateToProps,
  bindAction
)(Registro);