import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    FlatList,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import api from '../services/api';

export default class Home extends Component {

  //INICIALIZAÇÃO DO ESTADO
  state = {
    cards: null,
    loggedInUser: null,
    isLoading: false,
    didWillFocusSubscription: null,
  }

  //PEGAR OS CARDS
  getCards = () => {
    try{
      wait(5000).then(() => this.setState({isLoading: true})).then(() => this.setState({isLoading: false}));
    this.readCards();  
    }
    catch(error){
      Alert.alert(error.response.data.error);
    }
  }

  //LER CARDS
  readCards = async () => {
    try{
      const token = await AsyncStorage.getItem('@CodeApi:token');
      const response = await api.get('/cards/', {}, { headers: { "Authorization": `Bearer ${token}` }});
      const cards =  response.data.cards;

      this.setState({cards});
    }
    catch(error){
      Alert.alert(error.response.data.error);
    }    
  }

  componentWillMount(){
    this.readCards();
  }
    

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.welcomeText}>
                        <Text style={styles.textHeader}>
                        Olá, Cat!
                        </Text>

                        <Text style={styles.dateText}>Sexta, 19 de fevereiro</Text>
                    </View>
                    
                    <View style={styles.containerPic}> 
                        <TouchableOpacity //BOTÃO E FOTO DO USUÁRIO
                        style={styles.userButton}
                        onPress={() => this.props.navigation.navigate('Settings')}
                        >
                            <Image
                                source={this.state.loggedInUser &&
                                this.state.loggedInUser.pic ? 
                                {uri: this.state.loggedInUser.pic} : 
                                require('../pics/defaultUser2.png')}
                                style={styles.iconUser} 
                            />
                        </TouchableOpacity>
                     </View>

                </View>

                <View style = {styles.noteContainer}>
                    <Image //SÓBRIO HÁ TANTOS DIAS
                    style = {styles.logo}
                    source = {require('../pics/sober2.png')}
                    />

                    <View style = {styles.sendContainer} // TEXTO COM CAMPO
                    >
                        <TextInput
                            placeholder = 'Conte-nos como está se sentindo'
                            placeholderTextColor = '#736a86'
                            style = {styles.placeholder}
                            onChange = {this.onChangeTextEmail}
                        >
                        </TextInput>
                    
                        <TouchableOpacity>
                            <Image
                                style = {styles.sendLogo}
                                source = {require('../pics/enviar.png')}
                            />
                        </TouchableOpacity>
                        
                    </View>           

                </View>



                
                <FlatList      // ESPÉCIE DE "FEED" 
                        data={this.state.cards}
                        keyExtractor={item => item._id}
                        refreshing={this.state.isLoading}
                        onRefresh={this.getCards}
                        renderItem={({ item }) => {
                    return(
                    <View style={styles.containerCards}>
                        {
                        item.type === 'dicas' && // RENDERIZAÇÃO SE FOR UMA DICA...
                        <View style={styles.container, styles.dicas}>
                            <View style={styles.containerDicas}>
                                <View style={styles.containerDicasPic}>
                                    <Image
                                    source = {require('../pics/dicas.png')}
                                    style = { styles.iconDicas }
                                    resizeMode='center'
                                    />
                                </View>

                                    <View style={styles.containerDicasContent}>
                                        <Text
                                        style={styles.title}
                                        >
                                        {item.title}
                                        </Text>
                                        
                                        <Text
                                        style={styles.description}
                                        >
                                        {item.description}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>
                                    VER MAIS DICAS
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                        
                        {
                        item.type === 'fatos' && // RENDERIZAÇÃO SE FOR UM FATO...
                        <View style={styles.container, styles.fatos}>
                            <View style={styles.containerFatos}>
                            <View style={styles.containerFatosContent}>
                                <Text
                                style={styles.title}
                                >
                                {item.title}
                                </Text>

                                <Text
                                style={styles.description}
                                >
                                {item.description}
                                </Text>
                            </View>
                                    
                            <View style={styles.containerFatosPic}>
                                <Image
                                source = {require('../pics/fatos.png')}
                                style = { styles.iconFatos }
                                resizeMode='center'
                                />
                            </View>

                            </View>
                        </View>
                        }
                        
                        {
                        item.type === 'motivacional' && // RENDERIZAÇÃO SE FOR UM MOTIVACIONAL...
                          <View style={styles.container, styles.motivacional}>
                              <View style={styles.containerMotivacional}>
                              <View style={styles.containerMotivacionalPic}>
                                  <Image
                                      source = {require('../pics/motivacional.png')}
                                      style = { styles.iconMotivacional }
                                      resizeMode='center'
                                  />
                                  </View>
                                  <View style={styles.containerMotivacionalContent}>
                                      <Text
                                      style={styles.descriptionMotivacional}
                                      >
                                      {item.description}
                                      </Text>
                                  </View>
                              </View>
                            </View>
                        }
                    </View>
                    );
                
                }}/>

            </View>
        );
    }

};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'column',
  },  
  header:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
    position: 'relative',
  },
  welcomeText: {
    paddingLeft:15,
    marginTop:110,
    height:80,
    width: 300,
  },
  dateText:{
    color: '#797878',
    fontSize:12,
  },
  placeholder:{
    borderColor: '#E8E8E8',
    borderBottomWidth: 1.5,
    width: 340,
    paddingTop: 10,
    marginLeft:15,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },
  sendContainer:{
    flexDirection: 'row',
  },
  sendLogo:{
    marginTop:10,
    marginLeft:10,
    width: 30,
    height: 30,
  },
  logo:{
    marginLeft:6,
    marginTop:50,
    width: 393,
    height: 120,
  },
  containerPic: {
    paddingLeft:12,
    paddingTop:50,
    height: 80,
    width: 95,
  },
  userButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: '#4507A1',
    borderRadius: 100,
  },
  iconUser: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4507A1',
  },
  dicas: {
    height: 270,
    marginBottom: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: '#33333333',
  },  
  containerDicas: {
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  containerDicasPic: {
    position: 'relative',
    width: 120,
    height: 200,
    justifyContent: 'flex-start',
    borderRadius: 25,
  },
  containerDicasContent: {
    flex: 1,
    height: 200,
    borderRadius: 25,
  },
  iconDicas: {
    width: 110,
    height: 130,
  },
  button:{
    backgroundColor: 'rgb(211, 189, 240)',
    height: 43,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4507A1',
  },
  title: {
    fontSize: 18,
    color: '#334',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  description: {
    color: '#333',
    fontSize: 15,
    paddingTop: 10,
  },
  fatos: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: '#33333333',
  },  
  containerFatos: {
    flexDirection: 'row',
    marginLeft: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  containerFatosPic: {
    position: 'relative',
    width: 110,
    height: 200,
    justifyContent: 'flex-start',
    borderRadius: 25,
    marginRight: 10,
  },
  containerFatosContent: {
    flex: 1,
    height: 200,
    borderRadius: 25,
    paddingLeft: 10,
  },
  iconFatos: {
    width: 140,
    height: 140,
  },
  motivacional: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#4507A1',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 15,
  },
  containerMotivacional: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
  },
  containerMotivacionalPic: {
    alignItems: 'center',
    width: 110,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
    paddingTop: 25,
  },
  containerMotivacionalContent: {
    flex: 1,
    height: 200,
    borderRadius: 25,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 15,
  },
  iconMotivacional: {
    width: 60,
    height: 60,
  },
  descriptionMotivacional:{
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
    fontSize: 17,
    paddingTop: 10,
  }
  
});