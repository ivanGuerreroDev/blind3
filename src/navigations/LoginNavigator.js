import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Registro from '../screens/Registro';
import OlvidoContrasena from '../screens/OlvidoContrasena';
import OlvidoNuevaContrasena from '../screens/OlvidoNuevaContrasena';
import NuevaContrasena from '../screens/NuevaContrasena';
import ConfirmarCorreo from '../screens/ConfirmarCorreo';


export default createAppContainer(createStackNavigator({
  Login: Login,  
  Registro: Registro,
  ConfirmarCorreo: ConfirmarCorreo,
  OlvidoContrasena: OlvidoContrasena,
  NuevaContrasena: NuevaContrasena,
  OlvidoNuevaContrasena: OlvidoNuevaContrasena
}));


