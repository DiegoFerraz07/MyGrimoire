import React, {Component} from 'react';
import Router from './Router';




import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {PersistGate} from 'redux-persist/integration/react';

import firebase from 'firebase';

import {MenuProvider} from 'react-native-popup-menu';



export class MyGrimorioApp extends Component {
  componentDidMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDH2HsnWKEiGUDgmD0Bb8-uS4DSf5L-fAo',
      authDomain: 'mygrimorio.firebaseapp.com',
      databaseURL: 'https://mygrimorio.firebaseio.com',
      projectId: 'mygrimorio',
      storageBucket: 'mygrimorio.appspot.com',
      messagingSenderId: '645050801754',
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      
        <MenuProvider>
          <Router />
        </MenuProvider>
      
    );
  }
}

export default MyGrimorioApp;
