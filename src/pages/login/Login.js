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
import {useNavigation} from '@react-navigation/native';

import CardForm from '../../components/cards/CardForm';
import CardFormFooter from '../../components/cards/CardFormFooter';
import FormRow from '../../components/forms/FormRow';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BOOK_BACKGROUND = require('../../../resources/img/book.jpg');
const LOGO = require('../../../resources/img/5ered.png');

// create a component
function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  function componentDidMount() {
    this._retrieveData();
  }

  /* function onChangeHandler(field, value) {
    setMail({
      [field]: value,
    });
    setPassword({
      [field]: value,
    });
    console.log(mail, password);
  } */

  const _storeData = async token => {
    try {
      await AsyncStorage.setItem('@MyGrimorio:token', JSON.stringify(token));
    } catch (error) {
      console.log('error: not was possible persist the user data in phone');
    }
  };

  /*const _retrieveData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('@MyGrimorio:login')) || false;
      //const expiration = value.user.stsTokenManager.expirationTime;

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
  };*/

  async function logar() {
    setIsLoading(true);
    if (!email || !password) {
      setMessage('Por favor prencha os campos de email e senha');
      setIsLoading(false);
    }

    await axios
      .get('http://192.168.0.112:3000/users')
      .then(response => {
        response.data.map(login => {
          if (login.auth) {
            // salvar token em storage
            _storeData(login.token);
            return navigation.navigate('Dashboard');
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log(user);
    setIsLoading(false);
    /*props
      .tryLogin({email, password})
      .then(users => {
        if (users) {
          users.password = password;
          _storeData(users);
          return props.navigation.navigate('Dashboard');
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
      });*/
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
      <ButtonLogin onPress={() => logar()} underlayColor="#a37c00">
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
              placeholderTextColor="#A3A3A3"
              placeholder="user@mail.com"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </FormRow>
          <FormRow last>
            <InputLogin
              placeholder="********"
              value={password}
              secureTextEntry
              onChangeText={password => setPassword(password)}
            />
          </FormRow>
          {renderMessage()}
          {renderButton()}
        </CardForm>
        <CardFormFooter toScreen={() => navigation.navigate('Register')}>
          <TextFooterLogin>Cadastre-se</TextFooterLogin>
        </CardFormFooter>
      </CardLogin>
    </ContainerApp>
  );
}

//make this component available to the app
export default Login;
