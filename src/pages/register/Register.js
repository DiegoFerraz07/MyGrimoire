//import liraries
import React, {Component, useEffect, useState} from 'react';

import CardForm from '../../components/cards/CardForm';
import FormRow from '../../components/forms/FormRow';

import axios from 'axios';

import uuid from 'react-native-uuid';

import {
  ImageHeader,
  ImageBackground,
  CardLogin,
  InputLogin,
  ContainerLogin,
  ContainerError,
  LoadingButton,
  ButtonLogin,
  ButtonLoginText,
  ErrorText,
  ContainerApp,
} from './styles';

const bookBackground = require('../../../resources/img/book.jpg');

// create a component
function Register() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function tryRegister() {
    setIsLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Preencha todos os campos');
      setIsLoading(false);
    } else {
      //salvar o usuário no banco de dados
      const data = {
        id: uuid.v4(),
        name,
        email,
        password,
      };

      await axios
        .post('http://10.0.2.2:3000/users', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      setIsLoading(false);
      // criar objeto e salvar via post pelo json-server do arquivo db

      /*{
        "id": "ApZqh2lRENc43CpU3O9S8qthq4R2",
        "nome": "Diego",
        "email": "dihferraz-01@hotmail.com",
        "senha": "123456"
      },*/

      /*this.props
              .tryRegister({email, password})
              .then(user => {
                if (user) {
                  return this.props.navigation.replace('home');
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
  }

  const renderButton = () => {
    if (isLoading) {
      return <LoadingButton color="#FFF" />;
    }
    return (
      <ButtonLogin onPress={() => tryRegister()} underlayColor="#a37c00">
        <ButtonLoginText>Cadastrar</ButtonLoginText>
      </ButtonLogin>
    );
  };

  const renderMessage = () => {
    if (!message) {
      return null;
    }

    return (
      <ContainerError>
        <ErrorText>{message}</ErrorText>
      </ContainerError>
    );
  };

  return (
    <ContainerApp>
      <ImageBackground source={bookBackground} />
      <CardLogin>
        <CardForm imagem="register">
          <FormRow>
            <InputLogin
              placeholderTextColor="#A3A3A3"
              placeholder="Lancelot"
              value={name}
              onChangeText={name => setName(name)}
            />
          </FormRow>
          <FormRow>
            <InputLogin
              placeholderTextColor="#A3A3A3"
              placeholder="cavaleiro@tavola.com"
              value={email}
              onChangeText={mail => setEmail(mail)}
            />
          </FormRow>
          <FormRow last>
            <InputLogin
              placeholderTextColor="#A3A3A3"
              placeholder="********"
              value={password}
              secureTextEntry
              onChangeText={pass => setPassword(pass)}
            />
          </FormRow>
          {renderMessage()}
          {renderButton()}
        </CardForm>
      </CardLogin>
    </ContainerApp>
  );
}

//make this component available to the app
export default Register;
