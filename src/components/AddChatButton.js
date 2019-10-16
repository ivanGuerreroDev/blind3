import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class AddChatButton extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return(
      <TouchableOpacity
        onPress={()=>this.props.screenProps._goAddChat()}
        style={styles.btn}
      >
        <Icon name="chat-bubble" size={20} color="#fff" />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({ 
  btn:{
    position: 'absolute',
    bottom:10, right: 10,
    justifyContent: 'center', alignItems: 'center',
    width:60, height:60, borderRadius: 60,
    backgroundColor: '#124734'
  },
});