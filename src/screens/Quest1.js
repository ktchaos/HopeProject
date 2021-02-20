import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';


//OPÇÕES
const DATA = [
    {
        id: '1',
        title: 'Dependente',
        key: '1',
        
    },
    {
        id: '2',
        title: 'Co-dependente',
        key: '2',
        
    },
    {
        id: '3',
        title: 'Ex-dependente',
        key: '3',
        
    },
    {
        id: '4',
        title: 'Especialista',
        key: '4',
        
    },
];


function Item({ id, title }) {

    // CONTEÚDO DAS OPÇÕES
    //DEPENDENTES:
    if(id == 1){
        var selected = true;
        return (
            <TouchableOpacity
                
                style={[
                styles.item,
                    { borderWidth: 4,
                        //borderColor: selected ? 'rgb(62, 6, 136)' : 'rgb(170, 170, 170)' },
                }]}
            
            >
                <Image
                    source = {require('../icons/dependente.png')}
                    style = { styles.icon }
                />

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Sofro com dependência química e busco ajuda
                </Text>
            </TouchableOpacity>
        );
    }
    
    //CODEPENDENTES
    else if(id == 2){
        return (
            <TouchableOpacity
                onPress={ () => { 
                    //onSelect(id); 
                    //onChangeAns(title);
                }}
                style={[
                styles.item,
                    { borderWidth: 4,
                }]}
            >
                <Image
                    source = {require('../icons/codependente.png')}
                    style = { styles.icon }
                />

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Quero ajudar um familiar ou amigo dependente
                </Text>
            </TouchableOpacity>
        );
    }

    //EX-DEPENDENTES
    else if(id == 3){
        return (
            <TouchableOpacity
                onPress={ () => {
                }}
                style={[
                styles.item,
                    { borderWidth: 4,
                 } ]}
            >
                
                <Image
                    source = {require('../icons/exdependente.png')}
                    style = { styles.icon }
                />

                <Text style = { styles.title }>
                    { title }
                </Text>

                <Text style = {styles.description}>
                    Saí do mundo das drogas e busco ajudar outra pessoas
                </Text>
            </TouchableOpacity>
        );
    }

    //ESPECIALISTA
    else if(id == 4){
        return (
            <TouchableOpacity
                onPress={()=>{this.handlePick()}}
                style={[
                styles.item,
                    { borderWidth: 4,}]}
            >

                <Image
                    source = {require('../icons/especialista.png')}
                    style = { styles.icon }
                />
                
                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Sou especialista e desejo ajudar mais pessoas
                </Text>
            </TouchableOpacity>
        );
    }

}



// PRIMEIRA PERGUNTA CONFIG
export default class Quest1 extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        question1:{
            question: 'Com qual destes perfis você mais se identifica?',
            answer: null,
        },
        backgroundColor: '#FFF',
    };

    navigate = () => {
        this.props.navigation.navigate('Quest2');
    };

    render(){
        return(
            <View style = { styles.container }>
                
                <Text style = { styles.textQuest }>Pergunta 01 de 05</Text>
                <Text style = { styles.textHeader }>
                    Com qual destes perfis você mais se identifica?
                </Text>


                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                    <Item
                        id={item.id}
                        title={item.title}
                        />
                    )}
                    keyExtractor={item => item.id} 
                />
        

                <TouchableOpacity
                    style = { styles.button }
                    onPress={this.navigate}
                >
                    <Text style = { styles.textbutton }>
                        PRÓXIMA PERGUNTA
                    </Text>

                </TouchableOpacity>
                
            </View>

        );
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    textQuest: {
        fontSize: 20,
        color: '#33333380',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 30,
        marginRight: 20,
    },
    textHeader: {
        fontSize: 28,
        color: 'rgb(62, 6, 136)',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
        marginLeft: 1,
        marginTop: -65,
        marginRight: -50,
        marginBottom: 3,
    },
    item: {
        backgroundColor: '#FFF',
        marginVertical: 0,
        marginHorizontal: 16,
        borderRadius: 15,
        paddingRight: 130,
        paddingLeft: 130,
        paddingVertical: 30,
        marginBottom: 15,
    },
    description: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: -80,
    },
    icon: {
        width: 60,
        height: 60,
        marginLeft: -100,
    },
    button: {
        height: 48,
        width: 376,
        backgroundColor: 'rgb(211, 189, 240)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 50,
        marginLeft: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    }
});