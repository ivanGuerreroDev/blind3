import React from 'react';
import { View, BackAndroid, Alert, AppState, Platform, StatusBar, AsyncStorage } from 'react-native';
import Header from '../components/HeaderPrincipal';
import TabNavigator from '../navigations/Tab';
import { connect } from "react-redux";
import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";
import { addMessage } from "../actions/chats";
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Authentication Requerida', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Toca el sensor de huella', // Android
  sensorErrorDescription: 'Fallo', // Android
  cancelText: 'Cancelar', // Android
  fallbackLabel: 'Mostrar codigo', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
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
  
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.solicitarHuella()
    }
  };
  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  solicitarHuella(){
    TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      TouchID.authenticate('Comprobar identidad', optionalConfigObject)
      .then(success => {
        
      })
      .catch(error => {
        BackAndroid.exitApp();
      });
    })
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
