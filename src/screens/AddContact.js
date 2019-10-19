import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";
var server = require('../config')

class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.findFriend = this.findFriend.bind(this);
        this.renderFriend = this.renderFriend.bind(this);
    }
  static navigationOptions = {
    title: 'Agregar contacto',
    headerStyle: {
      backgroundColor: '#124734',
    },
    headerTintColor: '#fff',
  };


  render() {
    return (
      <View style={styles.content}>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Input
                placeholder='Ingrese correo electrónico'
                inputStyle={{color:'#333'}}
                containerStyle={{width:'75%'}}
                placeholderTextColor='#cbcbcb' 
                onChangeText={(e)=>this.setState({email: e})}
            />
            <TouchableOpacity 
                style={styles.buttonSearch}
                onPress={()=>this.findFriend()}
            >
                <Text style={{color:'#fff'}}>BUSCAR</Text>
            </TouchableOpacity>
        </View>
        {this.renderFriend()}
      </View>
    )
  }

    renderFriend(){
        const friend = this.state.friend;
        if(friend){
            return (
                <View 
                    style={{
                    flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 15,
                    }}
                >
                    <Image source={friend.avatar?friend.avatar:{uri: 'https://www.w3schools.com/w3images/avatar2.png'}} style={{
                        alignSelf: 'center', 
                        width: 60,
                        borderRadius: 300,
                        height: 60,
                        resizeMode: 'contain',
                        marginRight: 10,
                    }}/>
                    <View>
                        <Text  style={{fontSize:20, marginBottom:5}}>{friend.username}</Text>
                        <TouchableOpacity
                            style={styles.buttonAdd}
                            onPress={()=>{this.addFriend()}}
                        >
                            <Text style={{color:'#fff'}}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else{
            return(
                <View>
                    <Text  style={{fontSize:20}}>No se encontro contacto</Text>
                </View>
            )
        }
    }
    findFriend(){
        const email = this.state.email;
        const username = this.props.user.username
        var aqui = this;
        fetch(server.host+'/api/findFriend/', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'username': username
            }),
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.success){this.setState({friend: res.user})}
        })
    }
    addFriend(){
        var aqui = this;
        const { goBack } = this.props.navigation;
        fetch(server.host+'/api/sendRequest/', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': aqui.props.user.username,
                'request': aqui.state.friend.username
            }),
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.success){
                this.setState({friend: false});
                goBack();
            }
        })
    }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },   
  buttonSearch:{
    backgroundColor: '#124734', 
    width: '25%', height: 40, 
    justifyContent:'center', alignItems: 'center',
    borderRadius: 10   
  },
  buttonAdd:{
    backgroundColor: '#124734', height: 40, paddingHorizontal:5,
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
  )(AddContact);