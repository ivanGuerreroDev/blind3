import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from "react-redux";
import { deleteData } from "../actions/olvido";
import Loading from '../components/Loading'
var server = require('../config')
class OlvidoNuevaContrasena extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state= {
    error: '',
    autorizacion: this.props.olvido.olvidoContrasenaAutorizacion,
    correo : this.props.olvido.olvidoContrasenaCorreo
  }
  render() {
    if(!this.state.loading){
      return (
        <View style={styles.content}>
          
          <Text style={{fontSize: 18, color:'#fff', marginBottom:30, textAlign:'center'}}>Ingresa tu nueva contraseña.</Text>
          <Text style={{fontSize: 14, color:'red'}}>{this.state.error}</Text>
          <Input
            placeholder='Nueva Contraseña'
            inputStyle={{color:'#fff'}}
            placeholderTextColor='#cbcbcb' 
            secureTextEntry={true}
            onChangeText={(e)=>this.setState({password: e})}
          />
          <TouchableOpacity style={[styles.button, {marginTop:20}]}
            onPress={() => this._recovery()}
          >
            <Text style={{fontSize: 16, color:'#333', fontWeight:'700'}}>GUARDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:30}}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={{fontSize: 16, color:'#fff'}}>Cancelar</Text>
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

  _recovery(){
    this.setState({loading: true})
    return fetch(server.host+'/api/recovery/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.correo,
        'autorizacion': this.state.autorizacion,
        'password': this.state.password,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.valid){
        this.props.deleteData()
        this.props.navigation.navigate('Login');
      }else{
        let msg = responseJson.message;
        this.setState({error: msg})
      }
      this.setState({loading: false})
      
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
    deleteData: data => dispatch(deleteData())
  };
}

const mapStateToProps = state => ({
  olvido: state.olvidoReducer.data
});
export default connect(
  mapStateToProps,
  bindAction
)(OlvidoNuevaContrasena);