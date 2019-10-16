import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";

import { fetchDataSuccess, fetchDataRequest, fetchDataError } from "../actions/user";

class Ajustes extends React.Component {
  static navigationOptions = {
    title: 'Ajustes',
    headerStyle: {
      backgroundColor: '#124734',
    },
    headerTintColor: '#fff',
  };
  state = {
  }
  render() {
    return (
      <View style={styles.content}>
        <TouchableOpacity style={styles.listItem}>
          <Text>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text>Cambiar contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}
          onPress={()=>this._logout()}
        >
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _logout(){
    this.props.fetchDataUser();
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },   
  button:{
    backgroundColor: '#fff', 
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
    fetchDataUser: user => dispatch(fetchDataSuccess(user))
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  loading: state.userReducer.loading
});
export default connect(
  mapStateToProps,
  bindAction
)(Ajustes);