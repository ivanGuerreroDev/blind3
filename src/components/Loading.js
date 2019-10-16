import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { isLoading } = this.props;
    return (
      <View style={isLoading?styles.visible:styles.invisible}>
        <Image
          style={{
            alignSelf: 'center', 
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }}
          source={require('../assets/img/loading.gif')}
        />
      </View>
    )
  }
}
Loading.propTypes = {
  isLoading: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },   
  visible: {
    alignItems: 'center',justifyContent:'center', flex:1, width:'100%', height: '100%', position: 'absolute', zIndex:2,
    backgroundColor: '#124734'
  },
  invisible:{
    display: 'none'
  }
});