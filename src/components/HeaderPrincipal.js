import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HeaderPrincipal extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{flexDirection:'row', alignItems: 'center', backgroundColor:'#124734', paddingHorizontal:20, paddingVertical:15}}>
        <Text style={{color:'#fff', fontSize: 20, fontWeight:'700', flex:1}}>BLIND3</Text>
        <TouchableOpacity
          onPress={() => this.props.screenProps._goAjustes()}
        >
          <Icon name="cog" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}