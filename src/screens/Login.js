import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text,  TextInput, View, Image,
AsyncStorage, Keyboard, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import logo from '../images/logo.png';
import api from '../services/api';

export default class Login extends Component{

    static navigationOptions = {
        header: null,
    };

    //INICIALIZAÇÃO DO ESTADO (NULL)
    state = {
        errorMessage: null,
        loggedInUser: null,
        email: '',
        password: '',
    };

    
    //CHECAGEM PARA O LOGIN
    signIn = async (email, password) => {
      //VERIFICAÇÃO INICIAL
      if (email.length === 0 || password.length === 0) {
        return Alert.alert('Preencha usuário e senha para continuar!');
      }
      try{
        const response = await api.post('/auth/authenticate', {email, password});
        const {user, token} = response.data;

        await AsyncStorage.multiSet([
          ['@CodeApi: token', token],
          ['@CodeApi: user',  JSON.stringify(user)],
        ]);

        this.setState({ loggedInUser: user });
        Keyboard.dismiss();
        
        Alert.alert('Login feito com sucesso!');
        this.props.navigation.navigate('Home');
      }
      catch(error){
        Alert.alert(error.response.data.error);
      }
    };

    
    //COBRIR O TEXTO INSERIDO NO EMAIL
    handleChangeEmail = (event) => {
        event.persist();
        this.setState({ email:event.nativeEvent.text });
    };

    //COBRIR O TEXTO INSERIDO NA SENHA
    handleChangePassword = (event) => {
        event.persist();
        this.setState({ password:event.nativeEvent.text });
    };


  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        
        <ScrollView>

          <View style={styles.container}>
            {/*LOGO*/}
            <Image style={styles.logo} source={logo}/>

            {/*ENTRADAS DE EMAIL E SENHA*/}
            <View style={styles.containerTextInput}>
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#4B0082"
              onChange={this.handleChangeEmail}/>

              <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#4B0082"
              secureTextEntry={true}
              onChange={this.handleChangePassword}/>
            </View>

              {/*ENTRAR*/}
              <View>
                  {!!this.state.errorMessage && 
                    <Text style = {styles.textError}>{ this.state.errorMessage }</Text>
                  }

                <TouchableOpacity style={styles.loginButton} 
                onPress={() => this.signIn(this.state.email.trim(), this.state.password)}>
                  
                  <Text style={styles.textLoginButton}>ENTRAR</Text>
                </TouchableOpacity>
                

                <TouchableOpacity style={styles.forgotPasswordButton}
                onPress = { () => this.props.navigation.navigate('ForgotPassword') } >
                  <Text style={styles.textForgotPassword}>ESQUECI MINHA SENHA</Text>
                </TouchableOpacity>

              {/* CRIAR CONTA */}
                <Text style={styles.textNewUser}>NÃO POSSUI CONTA?</Text>

                <TouchableOpacity style={styles.newUserButton} 
                onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.textNewUser}>CRIAR NOVA CONTA</Text>
                </TouchableOpacity>
              </View>

          </View>
        </ScrollView>
        </KeyboardAvoidingView> 
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
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 42,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 9,
    backgroundColor: '#4507A1',
  },
  textLoginButton: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF',
  },
  textForgotPassword: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 55,
    marginBottom: 55,
    color: '#979696',
  },
  newUserButton: {
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
  textNewUser: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4507A1',
  },
});