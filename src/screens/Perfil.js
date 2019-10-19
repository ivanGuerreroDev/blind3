import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator, AppState} from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchDataSuccess, fetchDataRequest, fetchDataError, updateAvatar, updateInfo } from "../actions/user";
import DocumentPicker from 'react-native-document-picker';
import Loading from '../components/Loading';
import axios from 'axios';
const server = require('../config')
var FormData = require('form-data');

class Perfil extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
    headerStyle: {
      backgroundColor: '#124734',
    },
    headerTintColor: '#fff',
  };
  state = {
    nombresyapellidos: null,
    loading: false
  }
  componentDidMount(){
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.setState({
      nombresyapellidos: this.props.user.nombresyapellidos
    })
  }
  async selectFile(){
    try {
      this.setState({loading:true})
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.uploadFile(res);
    } catch (err) {
      this.setState({loading:false})
    }
  }
  uploadFile(data){
    var aqui = this;
    const form = new FormData();
    form.append('file', {
      uri: data.uri,
      name: 'avatar-'+this.props.user.username,
      type: data.type,
    });
    form.append("username", this.props.user.username);
    axios({
      method: 'post',
      url: server.host+'/api/changeAvatar',
      headers: {"Content-Type": "multipart/form-data","Accept": "application/json" },
      data: form
    })
    .then(function (response) {
      if(response.data.success){
        aqui.props.updateAvatar(`${server.host}/images/${response.data.avatar}`)
      }
      this.setState({loading:false})
    }).catch((err)=>{
      this.setState({loading:false});
    })
  }
  updateProfile(){
    var aqui = this;
    axios({
      method: 'post',
      url: server.host+'/api/updateProfile',
      headers: {"Content-Type": "application/json","Accept": "application/json" },
      data: {
        username: aqui.props.user.username,
        nombresyapellidos: aqui.state.nombresyapellidos
      }
    })
    .then(function (response) {
      aqui.setState({loading:false})
      if(response.data.success){
        var updateInfo = {
          nombresyapellidos : aqui.state.nombresyapellidos
        }
        for(var key in updateInfo){
          if(updateInfo[key]!=undefined&&updateInfo[key]!=null&&updateInfo[key]!=''){
            aqui.props.updateInfoUser({key: key, value:updateInfo[key]})
          }
        }
        aqui.props.navigation.navigate('Principal')
      }      
    }).catch((err)=>{
      aqui.setState({loading:false});
    })
  }
  render() {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#124734" hidesWhenStopped={true} animating={this.state.loading} />
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={()=>{this.selectFile()}}
        >
          <Icon name="edit" size={30} color="#fff" style={styles.avatarIcon}/>
          <Image 
            source={this.props.user.avatar?{uri: this.props.user.avatar}:require('../assets/img/avatar2.png')} 
            style={styles.avatar}/>
        </TouchableOpacity>
        <View style={styles.listItem}>
          <Text style={styles.label}>Nombre Completo:</Text>
          <TextInput 
            style={styles.input}
            placeholder='Ingrese su nombre completo'
            onChangeText={text => this.setState({nombresyapellidos: text})}
            value={this.state.nombresyapellidos}
          />
        </View>
        <TouchableOpacity style={[styles.button, {marginTop:20,alignSelf:'center'}]}
          onPress={() => {this.updateProfile()}}
        >
          <Text style={{fontSize: 16, color:'#fff', fontWeight:'700'}}>GUARDAR</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },   
  input: {
    height: 40, 
    borderColor: '#c0c0c0', 
    borderWidth: 1,
    paddingHorizontal: 10
  },
  label:{
    color: '#333',
    marginBottom: 5
  },
  avatarContainer:{
    alignSelf: 'center'
  },
  avatar:{
    width:200, height: 200,
    borderRadius: 15, borderWidth: 5,
    borderColor: '#e8f2ff',
    alignSelf: 'center'
  },
  avatarIcon:{
    position: 'absolute',
    bottom:10, right:10,
    zIndex:10
  },
  button:{
    backgroundColor: '#124734', 
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

function bindAction(dispatch) {
  return {
    requestDataUser: user => dispatch(fetchDataRequest()),
    requestError: user => dispatch(fetchDataError()),
    fetchDataUser: user => dispatch(fetchDataSuccess(user)),
    updateAvatar: user => dispatch(updateAvatar(user)),
    updateInfoUser: user => dispatch(updateInfo(user))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  loading: state.userReducer.loading
});
export default connect(
  mapStateToProps,
  bindAction
)(Perfil);