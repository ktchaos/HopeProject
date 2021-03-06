import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Keyboard,
} from 'react-native';

import logo from '../images/logo.png';
import api from '../services/api';

export default class Register extends Component{
  
    static navigationOptions = {
        header: null,
    };
  
    state = {
        loggedInUser: null,
        errorMessage: null,
        name: '',
        email: '',
        password: '',
    };
  
    onChangeTextName = (event) => {
        event.persist();
        this.setState({ name:event.nativeEvent.text });
    };

    onChangeTextEmail = (event) => {
        event.persist();
        this.setState({ email:event.nativeEvent.text });
    };

    onChangeTextPassword = (event) => {
        event.persist();
        this.setState({ password:event.nativeEvent.text });
    };

  //CADASTRAR USUÁRIO
  register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      const { user, token } = response.data;
      
      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);

      Keyboard.dismiss();
      Alert.alert('','Cadastro feito com sucesso!');
      this.props.navigation.navigate('Quest1');

    }
    catch(response){
      this.setState({errorMessage: response.data.error});
    }
  };

  render() {
    return (
    <View style={styles.container}>
      
      <Image
        style = {styles.logo}
        source = {logo}
      />
      
      {!!this.state.errorMessage && <Text style = {styles.textError}>{ this.state.errorMessage }</Text>}
      <View style={styles.containerTextInput}>
        <TextInput
          style = {styles.input}
          placeholder = "Nome"
          placeholderTextColor = "#4B0082"
          onChange = {this.onChangeTextName}
        />
        
        <TextInput
          style = {styles.input}
          placeholder = "E-mail"
          placeholderTextColor = "#4B0082"
          onChange = {this.onChangeTextEmail}
        />
        
        <TextInput
          style = {styles.input}
          placeholder = "Senha"
          placeholderTextColor = "#4B0082"
          secureTextEntry = {true}
          onChange = {this.onChangeTextPassword}
        />

      </View>

      <TouchableOpacity 
        onPress = { () => this.register(this.state.name.trim(),this.state.email.trim(), this.state.password)}
        style = { styles.newUserButton}
      >
        
        <Text style = {styles.textNewUser}>
          CADASTRAR
        </Text>
      
      </TouchableOpacity>
    
      <Text style={styles.textInfo}>
        JÁ POSSUI CONTA?
      </Text> 

      <TouchableOpacity 
        style={styles.existingUserButton}
        onPress={() => this.props.navigation.navigate('Login')}
      >
        <Text style={styles.textExistingUser}>
          FAZER LOGIN
        </Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 110,
    backgroundColor: '#fff',
  },
  logo: {
    width: 350,
    height: 90,
  },
  textError: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#CC0000',
  }, 
  input: {
    width: 340,
    marginTop: 25,
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  textInfo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    paddingTop: 50,
  },
  textNewUser: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF',
  },
  newUserButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 42,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 9,
    backgroundColor: '#4507A1',
  },
  textExistingUser: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4507A1',
  },
  existingUserButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 42,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#4507A1',
    backgroundColor: '#FFF',
  },
  textInfo: {
    fontWeight: 'bold',
    paddingTop: 50,
    fontSize: 14,
    color: '#4507A1',
  },    
});
