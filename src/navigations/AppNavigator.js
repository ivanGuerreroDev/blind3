import { createStackNavigator, createAppContainer } from 'react-navigation';
import Principal from '../screens/Principal';
import Ajustes from '../screens/Ajustes';
import CambiarContrasena from '../screens/CambiarContrasena';
import Chat from '../Chat';
import AddChat from '../screens/AddChat';
import AddContact from '../screens/AddContact';
import Perfil from '../screens/Perfil';




export default createAppContainer(createStackNavigator({


  Principal: Principal,  
  Ajustes: Ajustes, 
  Perfil: Perfil,
  CambiarContrasena: CambiarContrasena,
  Chat: Chat,
  AddChat: AddChat,
  AddContact: AddContact
}));


