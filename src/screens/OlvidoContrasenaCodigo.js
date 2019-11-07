import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from "react-redux";
import { setData } from "../actions/olvido";
import Loading from '../components/Loading'
var server = require('../config')
class OlvidoContrasenaCodigo extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state= {
    error: '',
    correo : this.props.olvido.olvidoContrasenaCorreo
  }
  render() {
    if(!this.state.loading){
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
    }else{
      return (
        <View style={{flex:1}}>
          <Loading isLoading={this.state.loading}/>
        </View>
      )
    }
  }

  _allowing(){
    this.setState({loading: true})
    return fetch(server.host+'/api/allowing/', {
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
      this.setState({loading: false})
      if(responseJson.valid){
        this.props.setData({key:'olvidoContrasenaAutorizacion',value: responseJson.resp});
        this.props.navigation.navigate('OlvidoNuevaContrasena');
      }else{
        let msg = responseJson.message;
        this.setState({error: msg})
      }
    })
    .catch((error) => {
      this.setState({loading: false})
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
    setData: data => dispatch(setData(data))
  };
}

const mapStateToProps = state => ({
  olvido: state.olvidoReducer.data
});
export default connect(
  mapStateToProps,
  bindAction
)(OlvidoContrasenaCodigo);