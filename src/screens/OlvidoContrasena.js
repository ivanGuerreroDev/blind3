import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';

export default class OlvidoContrasena extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state= {
    error: ''
  }
  render() {
    return (
      <View style={styles.content}>
        
        <Text style={{fontSize: 18, color:'#fff', marginBottom:30, textAlign:'center'}}>Ingresa su correo electronico.</Text>
        <Text style={{fontSize: 14, color:'red'}}>{this.state.error}</Text>
        <Input
          placeholder='Ingrese su correo electronico'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.setState({correo: e})}
        />
        <TouchableOpacity style={[styles.button, {marginTop:20}]}
          onPress={() => this._permission()}
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

  _permission(){
    this.props.screenProps._setState({loading: true})
    return fetch('https://blind3.herokuapp.com/api/permission/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'type': 'Recovery',
        'correo': this.state.correo,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.props.screenProps._setState({loading: false})
      if(responseJson.valid){
        this.props.screenProps._setState({olvidoContrasenaCorreo: this.state.correo});
        this.props.navigation.navigate('OlvidoContrasenaCodigo');
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