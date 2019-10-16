import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Ajustes extends React.Component {
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
        <Input
          placeholder='Nueva Contraseña'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.setState({contraseña: e})}
        />
        <Input
          placeholder='Repetir Contraseña'
          inputStyle={{color:'#fff'}}
          placeholderTextColor='#cbcbcb' 
          onChangeText={(e)=>this.setState({recontraseña: e})}
        />
        <TouchableOpacity style={styles.listItem}
          onPress={()=>this._logout()}
        >
          <Text>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _logout(){
    this.props.screenProps._setState({loading: true});
    return fetch('https://blind3.herokuapp.com/api/logout/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.state.username,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.props.screenProps._setState({loading: false})
      if(responseJson.success){
        this.props.screenProps._logout();
      }else{
        var msg;
        if(responseJson.error) msg=responseJson.error.message;
        if(responseJson.info) msg=responseJson.info.message;
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