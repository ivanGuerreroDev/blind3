import React from "react";
import Setup from "./src/App";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import configureStore from './src/configStore'
const { persistor, store } = configureStore();
console.log(store)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>  
        <PersistGate persistor={persistor}>
          <Setup />
        </PersistGate>
      </Provider>
    );
  }
}