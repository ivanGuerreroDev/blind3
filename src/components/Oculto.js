import React from 'react';
import { View, Image, Dimensions  } from 'react-native';
export default class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{flex:1,backgroundColor: '#124734'}}/>
    )
  }
}