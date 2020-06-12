import React from 'react';
import { View } from 'react-native';
import Header from '../components/HeaderPrincipal';
import TabNavigator from '../navigations/Tab';
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
