//import liraries
import React, {Component, useEffect, useState} from 'react';

import CardForm from '../../components/cards/CardForm';
import FormRow from '../../components/forms/FormRow';

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
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  function tryRegister() {
    setIsLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Preencha todos os campos');
      setIsLoading(false);
    } else {
      console.log('fazer o cadastro do sujeito');
      // TODO: fazer o registro
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
              placeholder="user@mail.com"
              value={email}
              onChangeText={mail => setEmail(mail)}
            />
          </FormRow>
          <FormRow last>
            <InputLogin
              placeholder="********"
              value={password}
              secureTextEntry
              onChangeText={pass => setPassword(pass)}
            />
          </FormRow>
          {renderMessage}
          {renderButton}
        </CardForm>
      </CardLogin>
    </ContainerApp>
  );
}

//make this component available to the app
export default Register;
