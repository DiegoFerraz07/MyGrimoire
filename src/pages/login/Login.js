//import liraries
import React, {Component, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  ContainerLogin,
  ImageBackground,
  CardLogin,
  InputLogin,
  TextFooterLogin,
  LoadingButton,
  ButtonLogin,
  ContainerError,
  ButtonLoginText,
  ImageHeader,
  ErrorText,
  ContainerApp,
} from './styles';

import {connect} from 'react-redux';

import CardForm from '../../components/cards/CardForm';
import CardFormFooter from '../../components/cards/CardFormFooter';
import FormRow from '../../components/forms/FormRow';

import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOK_BACKGROUND = require('../../../resources/img/book.jpg');
const LOGO = require('../../../resources/img/5ered.png');

// create a component
function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  function componentDidMount() {
    this._retrieveData();
  }

  function onChangeHandler(field, value) {
    this.setState({
      [field]: value,
    });
  }

  const _storeData = async user => {
    try {
      console.log(JSON.stringify(user));
      await AsyncStorage.setItem('@MyGrimorio:login', JSON.stringify(user));
      console.log(await AsyncStorage.getItem('@MyGrimorio:login'));
    } catch (error) {
      console.log('error: not was possible persist the user data in phone');
    }
  };
  const _retrieveData = async () => {
    try {
      console.log('login', await AsyncStorage.getItem('@MyGrimorio:login'));
      const value =
        JSON.parse(await AsyncStorage.getItem('@MyGrimorio:login')) || false;
      const expiration = value.user.stsTokenManager.expirationTime;

      if (value) {
        if (Date.now() > expiration) {
          this.logar(value.user.email, value.password);
        } else {
          this.setState({
            mail: value.user.email,
            password: value.password,
          });
          this.props.userLoginSuccess(value);
          return this.props.navigation.navigate('Dashboard');
        }
      }
    } catch (error) {
      return null;
    }
  };

  function logar(email = '', password = '') {
    this.setState({isLoading: true, message: ''});
    if (email === '' && password === '') {
      email = this.state.mail;
      password = this.state.password;
    }

    this.props
      .tryLogin({email, password})
      .then(user => {
        if (user) {
          user.password = password;
          _storeData(user);
          return this.props.navigation.navigate('Dashboard');
        }

        this.setState({
          isLoading: false,
          message: '',
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          message: this.getMessageByErrorCode(error),
        });
      });
  }

  function getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'E-mail inválido';
      case 'auth/user-disabled':
        return 'Usuário não permitido';
      case 'auth/wrong-password':
        return 'Senha e/ou Email incorreto(s)';
      case 'auth/network-request-failed':
        return Alert.alert(
          'Falha na conexão',
          'Não consigo acessar a internet. Verifique a sua conexão e tente novamente.',
        );
      default:
        return errorCode;
    }
  }
  function renderButton() {
    if (isLoading) {
      return <LoadingButton color="#FFF" />;
    }
    return (
      <ButtonLogin onPress={() => this.logar()} underlayColor="#a37c00">
        <ButtonLoginText>Entrar</ButtonLoginText>
      </ButtonLogin>
    );
  }

  function renderMessage() {
    

    if (!message) {
      return null;
    }

    return (
      <ContainerError>
        <ErrorText>{message}</ErrorText>
      </ContainerError>
    );
  }
  return (
    <ContainerApp>
      <ImageBackground source={BOOK_BACKGROUND} />
      <CardLogin>
        <CardForm imagem="login">
          <FormRow first>
            <InputLogin
              placeholder="user@mail.com"
              value={mail}
              onChangeText={value => this.onChangeHandler('mail', value)}
            />
          </FormRow>
          <FormRow last>
            <InputLogin
              placeholder="********"
              value={password}
              secureTextEntry
              onChangeText={value => this.onChangeHandler('password', value)}
            />
          </FormRow>
          {renderMessage()}
          {renderButton()}
        </CardForm>
        <CardFormFooter
          toScreen={() => this.props.navigation.navigate('register')}>
          <TextFooterLogin>Cadastre-se</TextFooterLogin>
        </CardFormFooter>
      </CardLogin>
    </ContainerApp>
  );
}

//make this component available to the app
export default Login;
