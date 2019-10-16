import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createAppContainer,createMaterialTopTabNavigator, createTabNavigator, createMaterialBottomTabNavigator, createBottomTabNavigator } from 'react-navigation';
import ChatsScreen from '../screens/Chats';
import ContactosScreen from '../screens/Contactos';


class Chats extends React.Component {
  render() {
    return (
      <ChatsScreen 
        screenProps={{
          _goChat: (username)=> this.props.screenProps._goChat(username),
          _goAddChat: ()=> this.props.screenProps._goAddChat(),
          _getState: ()=> this.props.screenProps._getState(),
          _setState: ()=> this.props.screenProps._setState()
        }}
      />
    );
  }
}

class Contactos extends React.Component {
  render() {
    return (
      <ContactosScreen 
      screenProps={{
        _goChat: (username)=> this.props.screenProps._goChat(username),
        _goAddContact: ()=> this.props.screenProps._goAddContact(),
        _getState: ()=> this.props.screenProps._getState(),
        _setState: ()=> this.props.screenProps._setState()
      }}
      />
    );
  }
}


const TabNavigator = createMaterialTopTabNavigator({
  Chats: Chats,
  Contactos: Contactos
},{
  tabBarOptions: {
    labelStyle: {
      fontWeight: '700',
      fontSize: 14,
    },
    activeTintColor: '#ffd526',
    inactiveTintColor: '#FFFFFF',
    style: {
      backgroundColor: '#124734',
      shadowOpacity: 0,
      elevation: 0,
      shadowColor: 'transparent'
    },
    indicatorStyle: {
      backgroundColor: '#ffd526'
    }
  }
});

export default createAppContainer(TabNavigator);