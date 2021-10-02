//import liraries
import React, {Component} from 'react';
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {connect} from 'react-redux';
import axios from 'axios';

import CardPersonagem from '../../components/cards/CardPersonagem';
import AddPersonagem from '../../components/AddPersonagem';
import {
  ContainerApp,
  ImageHeader,
  TextLogoutHeader,
  ContainerLoading,
  ContainerLoadingNothing,
  ImageNothing,
  TextNothing,
} from './styles';

const LOGOUT = require('../../../resources/img/logout.png');
const NOTHING = require('../../../resources/img/nothing.png');

// create a component
class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.ignoredYellowBox = ['Setting a timer'];

    this.state = {
      persons: [],
      dataStorage: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    //this.props.navigation.setParams({logout: this.logout});
    this.getPersonsFireBase();
  }

  _storeData = async (data, store) => {
    try {
      await AsyncStorage.setItem(store, JSON.stringify(data));
    } catch (error) {
      console.log('error: not was possible persist the user data in phone');
    }
  };

  async getTokenStorage() {
    try {
      const token = (await AsyncStorage.getItem('@MyGrimorio:token')) || false;
      console.log('pegando token do async:', token);
      return token;
    } catch (error) {
      return false;
    }
  }

  _removeData = async () => {
    try {
      await AsyncStorage.removeItem('@MyGrimorio:token');
    } catch (error) {
      console.log('error: not was possible persist the user data in phone');
    }
  };

  async getPersonsFireBase() {
    const token = await this.getTokenStorage();
    console.log(token);
    if (!token) {
      //não tem token registrado e não pode acessar o dashboard, redirecionar para login
      this.logout();
    }
    const config = {
      //params: {personId},
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    };
    console.log(config);
    await axios
      .get('https://mygrimoire-api.herokuapp.com/my-persons', config)
      .then(response => {
        if (response.data.persons) {
          // salvar token em storage
          const {persons} = response.data;
          console.log('persons', persons);
          this.setState({persons});
        }
      })
      .catch(error => {
        console.log(
          'erro ao tentar solicitar meus personagens:',
          error.response,
        );
      });
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('logout')}>
          <ImageHeader logout source={LOGOUT} />
          <TextLogoutHeader>Sair</TextLogoutHeader>
        </TouchableOpacity>
      ),
    };
  };

  logout = () => {
    this.props
      .tryLogout()
      .then(() => {
        this._removeData();
        this.props.navigation.navigate('Login');
      })
      .catch(() => {
        Alert.alert('Erro ao tentar sair da conta', 'Tente mais tarde!');
      });
  };

  navigateToPerson(id) {
    this._storeData(id, '@MyGrimorio:idPerson');
    console.log('********id enviado', id);
    this.props.navigation.navigate('Home', {idPerson: id});
  }

  renderDashboard() {
    if (this.state.persons && this.state.persons.length == 0) {
      return (
        <ContainerLoading>
          <ActivityIndicator size="large" color="#D6A200" />
        </ContainerLoading>
      );
    } else if (this.state.persons) {
      return this.state.persons.map((personagem, key) => (
        <TouchableOpacity
          key={personagem.id}
          onPress={() => this.navigateToPerson(personagem.id)}>
          <CardPersonagem personagem={personagem} />
        </TouchableOpacity>
      ));
    } else {
      return (
        <ContainerLoadingNothing>
          <ImageNothing source={NOTHING} />
          <TextNothing>Nenhum personagem cadastrado!</TextNothing>
        </ContainerLoadingNothing>
      );
    }
  }

  render() {
    return (
      <ContainerApp
        nothing={
          this.state.persons && this.state.persons.length == 0 ? true : false
        }>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[
                '#5B4500',
                '#967101',
                '#bf9003',
                '#D6A200',
                '#eab100',
                '#383838',
              ]}
              tintColor={'#D6A200'}
              refreshing={this.state.refreshing}
              onRefresh={() => this.getPersonsFireBase()}
            />
          }>
          {this.renderDashboard()}
        </ScrollView>
        <AddPersonagem
          addPersonagem={() => this.props.navigation.navigate('AddPerson')}
        />
      </ContainerApp>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

//make this component available to the app
export default Dashboard;
