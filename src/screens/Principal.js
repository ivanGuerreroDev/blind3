import React from 'react';
import { View } from 'react-native';
import Header from '../components/HeaderPrincipal';
import TabNavigator from '../navigations/Tab';
import TouchID from 'react-native-touch-id';
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";
import { addMessage } from "../actions/chats";


class Principal extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props; 
    this.state = {
      
    };
  }
  static navigationOptions = {
    header: null,
  };
  
  componentDidMount(){
    TouchID.isSupported()
    .then(biometryType => {
      if (biometryType === 'TouchID') {
        const optionalConfigObject = {
          title: 'Authentication Requerida', // Android
          imageColor: '#e00606', // Android
          imageErrorColor: '#ff0000', // Android
          sensorDescription: 'Toca el sensor de huella', // Android
          sensorErrorDescription: 'Fallo', // Android
          cancelText: 'Cancelar', // Android
          fallbackLabel: 'Mostrar codigo', // iOS (if empty, then label is hidden)
          unifiedErrors: true, // use unified error messages (default false)
          passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
        };
        TouchID.authenticate('Desbloquear con huella', optionalConfigObject)
        .then(success => {
          if(!success){
            this.props.screenProps._setState({isLogged: false});
          }
        })
        .catch(error => {
          this.props.screenProps._setState({isLogged: false});
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
    
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Header 
          screenProps={{
            _goAjustes: () => this.props.navigation.navigate('Ajustes')

          }}
        />
        <TabNavigator style={{flex:1}}
          screenProps={{
            _goChat: (username)=> this.props.navigation.navigate('Chat', {
              username: username,
            }),
            _goAddChat: ()=> this.props.navigation.navigate('AddChat'),
            _goAddContact: ()=> this.props.navigation.navigate('AddContact'),
            _getState: ()=> this.props.screenProps._getState(),
            _setState: ()=> this.props.screenProps._setState()
          }}
        />
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    fetchDataUser: user => dispatch(fetchDataSuccess(user)),
    addMessage: data => dispatch(addMessage(data))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  chats: state.chatsReducer.data
});
export default connect(
  mapStateToProps,
  bindAction
)(Principal);
