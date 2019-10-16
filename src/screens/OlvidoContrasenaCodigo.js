import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';

export default class OlvidoContrasena extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state= {
    error: '',
    correo : this.props.screenProps._getState().olvidoContrasenaCorreo
  }
  render() {
    return (
      <View style={styles.content}>
        
        <Text style={{fontSize: 18, color:'#fff', marginBottom:30, textAlign:'center'}}>Ingresa el codigo enviado a tu correo electrónico.</Text>
        <Text style={{fontSize: 14, color:'red'}}>{this.state.error}</Text>
        <Input
          placeholder='Ingrese su codigo'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.setState({code: e})}
        />
        <TouchableOpacity style={[styles.button, {marginTop:20}]}
          onPress={() => this._allowing()}
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

  _allowing(){
    this.props.screenProps._setState({loading: true})
    return fetch('https://blind3.herokuapp.com/api/allowing/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.correo,
        'code': this.state.code,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.props.screenProps._setState({loading: false})
      if(responseJson.valid){
        this.props.screenProps._setState({olvidoContrasenaAutorizacion: responseJson.resp});
        this.props.navigation.navigate('OlvidoNuevaContrasena');
      }else{
        let msg = responseJson.message;
        this.setState({error: msg})
      }
    })
    .catch((error) => {
      this.props.screenProps._setState({loading: false})
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