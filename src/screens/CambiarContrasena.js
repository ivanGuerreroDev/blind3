import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

export default class CambiarContrasena extends React.Component {
  static navigationOptions = {
    title: 'Cambiar Contraseña',
    headerStyle: {
      backgroundColor: '#124734',
    },
    headerTintColor: '#fff',
  };
  state = {
  }
  render() {
    return (
      <View style={styles.content}>
        <View style={styles.listItem}>
          <Text style={styles.label}>Nueva Contraseña:</Text>
          <TextInput
            placeholder='Nueva Contraseña'
            style={styles.input}
            placeholderTextColor='#cbcbcb' 
            onChangeText={(e)=>this.setState({contrasena: e})}
          />
        </View>
        
        <View style={styles.listItem}>
          <Text style={styles.label}>Repetir Contraseña:</Text>
          <TextInput
            placeholder='Repetir Contraseña'
            style={styles.input}
            placeholderTextColor='#cbcbcb' 
            onChangeText={(e)=>this.setState({recontrasena: e})}
          />
        </View>
        
        <TouchableOpacity style={[styles.button, {marginTop:20,alignSelf:'center'}]}
          onPress={()=>this.cambiarContrasena()}
        >
          <Text style={{color:'#fff'}}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
    )
  }

  cambiarContrasena(){
    var aqui = this;
    aqui.setState({loading:true})
    if(aqui.state.contrasena === aqui.state.recontrasena){
      axios({
        method: 'post',
        url: server.host+'/api/changePassword',
        headers: {"Content-Type": "application/json","Accept": "application/json" },
        data: {
          username: aqui.props.user.username,
          password: aqui.state.contraseña
        }
      })
      .then(function (response) {
        aqui.setState({loading:false})
        if(response.data.success){
          aqui.props.navigation.navigate('Principal')
        }else{
          Alert.alert('No se pudo actualizar su información intente denuevo','',
          [
            {text: 'Ok'}
          ],
            {cancelable: true},
          );
        }
      })
    }else{
      aqui.setState({loading:false})
      Alert.alert('Contraseñas no coinciden','',
      [
        {text: 'Ok'}
      ],
        {cancelable: true},
      );
    }
    
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
    backgroundColor: '#124734', 
    width: 200, height: 40, 
    justifyContent:'center', alignItems: 'center',
    borderRadius: 10   
  },
  label:{
    color: '#333',
    marginBottom: 5
  },
  listItem: {
    paddingVertical: 20,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    width: '100%'
  },
  input: {
    height: 40, 
    borderColor: '#c0c0c0', 
    borderWidth: 1,
    paddingHorizontal: 10
  },
});