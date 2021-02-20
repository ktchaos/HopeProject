import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Picker,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image,
    Button,
    Alert,
    RefreshControl,
} from 'react-native';

import api from '../services/api';

export default class CreateCards extends Component {

    state = {
        title: null,
        type: null,
        description: null,
        content:null,
        errorMessage: null,
    };

    static navigationOptions = {
        title: 'Criar Cards',
        headerTintColor: '#4B0082',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    handleTextTitle = (event) => {
        this.setState({ title: event.nativeEvent.text });
    };

    handleTextDescription = (event) => {
        this.setState({ description: event.nativeEvent.text });
    };

    createCards = async (title, type, description, content) => {
        try{
            if(description){
                const token = await AsyncStorage.getItem('@CodeApi:token');

                await api.post('/cards/register_card', {
                    title,
                    type,
                    description,
                    content,
                }, { headers: { "Authorization": `Bearer ${token}` }});

                Alert.alert('Card criado com sucesso!');
            }

        }
        catch (response) {
            console.log(response);
            this.setState({ errorMessage: response.data.error });
        }
    }


    render() {
        return(
            
                <View style = {styles.containerAll}>   
                    <View style = {styles.container}>

                        <Text style={styles.textType} >
                            Selecione um tipo de card:
                        </Text>

                        <View style = {styles.containerPicker}>
                            <Picker
                                style={styles.picker}
                                itemStyle={{fontSize: 50}}
                                selectedValue={this.state.type}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({type: itemValue})
                                }
                            >   
                                <Picker.Item label = 'Tipos de card' value = {null} />
                                <Picker.Item label = 'Dicas' value = 'dicas' />
                                <Picker.Item label = 'Fatos' value = 'fatos'/>
                                <Picker.Item label = 'Motivacional' value = 'motivacional'/>
                                
                            </Picker>

                        </View>

                        {   
                            (this.state.type == 'dicas' ||
                            this.state.type == 'fatos') &&

                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder = 'Título'
                                    onChange={this.handleTextTitle}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder = 'Conteúdo'
                                    onChange={this.handleTextDescription}
                                />
                            </View>
                        }
                        {   
                            
                            this.state.type == 'motivacional' &&

                            <View>

                                <TextInput
                                    style={styles.input}
                                    placeholder = 'Descrição'
                                    onChange={this.handleTextDescription}
                                />

                            </View>
                        }

                    { !!this.state.errorMessage && <Text style = { styles.textError }> { this.state.errorMessage }</Text> }

                    </View>

                    <View
                        style={styles.containerButton}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.createCards(
                                this.state.title, 
                                this.state.type, 
                                this.state.description, 
                                this.state.link, 
                                this.state.image
                            )}
                        >
                            
                            <Text style = { styles.textbutton }> CRIAR </Text>

                        </TouchableOpacity>
                    </View>

                </View>                       
        );
    }
};

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
    },
    container: {
        height: 730,
    },
    containerPicker: {
        borderBottomWidth: 2,
        borderColor: '#33333333',
        marginBottom: 20,
    },
    containerButton:{
        alignItems: 'center',
        
    },
    textType: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 30,
        paddingBottom: 30,
        fontWeight:'bold',
    },
    picker: {
        color: '#4507A1',
    },
    input: {
        borderColor: '#33333333',
        borderBottomWidth: 1,
        marginTop: 25,
        padding: 15,
        backgroundColor: '#FFF',
        fontSize: 16,
    },
    button: {
        
        height: 42,
        width: 350,
        backgroundColor: '#4507A1',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textError: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F33',
    }
});