import React, {Component} from 'react';
import { 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Scrollview, 
  Text, 
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  } from 'react-native';

import api from '../services/api';

export default class ForgotPassword extends Component {
  
  static navigationOptions = {
    header: null,
  };
  
  state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
  };

  handleEmailText = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  forgot = async (email) => {
    try {
      //CONSUMINDO API
      const response = await api.post('/auth/forgot_password', {
        email,
      }); 

      //ARMAZENANDO EMAIL
      const test = await AsyncStorage.setItem('@CodeApi:email', email);

      Alert.alert( '' ,'Código enviado!', [{
        text: 'Ok',
        //ENVIAR CÓDIGO
        onPress: () => this.props.navigation.navigate('ChangePassword', {
            email: email,
        }),
      }]);
      
    }
    catch (response) {
      this.setState({ errorMessage: response.data.error});
    }
  };
  
  
  render(){
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"padding"} 
        
      >
        <ScrollView>
          <TouchableOpacity
              style = {styles.buttonArrow}
              onPress = { () => this.props.navigation.navigate('Login')}
          >
              <Image
                  style = {styles.backArrow}
                  source = {require('../pics/voltar.png')}
              />
              
          </TouchableOpacity>
          
          <View style = {styles.containerLogo}>
            <Image
                style = {styles.logo}
                source = {require('../pics/logo.png')}
            />
          </View>
          
          <View>
            <TextInput
              placeholder = 'Digite seu email para envio do código'
              placeholderTextColor = '#736a86'
              style = {styles.placeholder}
              onChange = {this.handleEmailText}
            > 

            </TextInput>
          
          </View>

          
          {!!this.state.errorMessage && <Text style = {styles.errorText}>{this.state.errorMessage}</Text>}
          <View style={styles.containerButton}>
            
            <TouchableOpacity
              style = {styles.button}
              onPress = { () => this.forgot(this.state.email.trim())}
            >
              <Text style = {styles.buttonText} >ENVIAR CÓDIGO</Text>
            </TouchableOpacity>

          </View>
            <View style = {styles.newUserDisplay}>
              
              <Text style = {styles.newUser}>
                NÃO POSSUI CONTA?
              </Text>

            
              <TouchableOpacity
                style = {styles.newUserButton}
                onPress = { () => this.props.navigation.navigate('Register') }
              >
                <Text style = {styles.newUserButtonText}> CRIAR CONTA</Text>
              </TouchableOpacity>
            </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  logo:{
    marginTop:180,
    width: 500,
    height: 150,
  },
  containerLogo:{
    marginHorizontal:-50,
  },
  backArrow:{
    marginTop:10,
    width: 40,
    height: 40,
  },
  buttonArrow:{
    backgroundColor: '#FFF',
    borderRadius:8,
    paddingTop:25,
    width: 40,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  button:{
    marginTop:15,
    paddingTop:11,
    paddingLeft:102,
    backgroundColor: '#4507A1',
    borderRadius: 8,
    marginLeft:29,
    height:50,
    width:330,
  },
  buttonText:{
    color:'#FFF',
    fontSize:16,
    fontWeight: 'bold',
  },
  errorText:{
    color: '#c4342d',
    paddingLeft:115,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholder:{
    borderColor: '#E8E8E8',
    borderBottomWidth: 1.5,
    width: 340,
    marginTop: 10,
    marginLeft:25,
    paddingTop: 25,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },
  newUserButton:{
    borderColor: '#4507A1',
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 25,
    width: 150,
    height: 30,
    marginBottom: 5
  },
  newUserDisplay:{
    flexDirection: 'row',
    paddingTop:100,
    marginLeft:38,
  },
  newUser:{
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4507A1',
    paddingTop:4,
  },
  newUserButtonText:{
    paddingTop:2,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4507A1',
  }
});