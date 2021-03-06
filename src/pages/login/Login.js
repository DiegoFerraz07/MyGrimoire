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
      await AsyncStorage.setItem('@MyGrimorio:token', token);
    } catch (error) {
      console.log('error: not was possible persist the user data in phone');
    }
  };

  /*const _retrieveData = async () => {
    try {
      const value =
        JSON.stringify(await AsyncStorage.getItem(email, password)) || false;
      const expiration = value.user.stsTokenManager.expirationTime;
      console.log(value);
      if (value) {
        if (Date.now() > expiration) {
          logar(value.user.email, value.password);
        } else {
          setUser({
            mail: value.user.email,
            password: value.password,
          });

          return navigation.navigate('Dashboard');
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
      .post('https://mygrimoire-api.herokuapp.com/login', {email, password})
      .then(response => {
        if (response.data.auth) {
          // salvar token em storage
          console.log(response.data);
          _storeData(response.data.token);
          return navigation.navigate('Dashboard');
        }
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
        return 'E-mail inv??lido';
      case 'auth/user-disabled':
        return 'Usu??rio n??o permitido';
      case 'auth/wrong-password':
        return 'Senha e/ou Email incorreto(s)';
      case 'auth/network-request-failed':
        return Alert.alert(
          'Falha na conex??o',
          'N??o consigo acessar a internet. Verifique a sua conex??o e tente novamente.',
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
