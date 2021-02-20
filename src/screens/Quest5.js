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


export default class Quest5 extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        data: [
            {
                item1: {
                    id:'1',
                    key:'1',
                    answer:'muito mau',
                    icon: require('../icons/muitomau.png'),
                    color: 'red',
                    marginLeft: 25,
                    marginTop: 25,
                },
                item2: {
                    id: '2',
                    key:'2',
                    answer: 'mau',
                    icon: require('../icons/mau.png'),
                    color: 'rgb(120, 158, 230)',
                    marginLeft: 215,
                    marginTop: -160,
                }
            },
            {
                item1: {
                    id: '3',
                    key:'3',
                    answer: 'boa',
                    icon: require('../icons/boa.png'),
                    color: 'rgb(206, 193, 17)',
                    marginLeft: 25,
                    marginTop: 20,
                },
                item2: {
                    id: '4',
                    key:'4',
                    answer: 'muito boa',
                    icon: require('../icons/muitoboa.png'),
                    color: 'rgb(9, 185, 53)',
                    marginLeft: 215,
                    marginTop: -158,
                }
            },
        ],
    }

    navigateHome = () => {
        this.props.navigation.navigate('Home');
    }

    render () {
        return (
            <View style = { styles.container }>

                <Text style = { styles.textQuest }>Pergunta 05 de 05</Text>
                

                <FlatList
                    data={this.state.data}
                    style={styles.flatList}
                    renderItem = {({item}) => {

                        return(
                            <View style={styles.contentflatList}>
                                <TouchableOpacity
                                    onPress={() => {
                                    }}
                                    style = {{
                                            ...styles.button,
                                            borderWidth: 4,
                                        }
                                    }
                                >
                                    <Image
                                        style={styles.icon}
                                        source = {item.item1.icon}
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                       
                                    }}
                                    style = {{
                                            ...styles.button,
                                            borderWidth: 4,
                                        }
                                    }
                                >
                                    <Image
                                        source = {item.item2.icon}
                                        style = { styles.icon }
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />

                <TouchableOpacity
                    style = { styles.button1 }
                    onPress = {this.navigateHome}
                >
                    <Text style = { styles.textbutton }>CONCLUIR QUESTIONÁRIO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = { styles.button2 }
                    onPress = {this.navigateHome}
                >
                    <Text style = { styles.textbutton2 }>RESPONDER MAIS TARDE</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
    },
    textQuest: {
        fontSize: 20,
        color: '#33333380',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: -150,
        marginRight: 20,
    },
    textHeader: {
        fontSize: 28,
        color: 'rgb(62, 6, 136)',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 31,
        marginRight: 20,
    },
    contentflatList: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    flatList: {
        minHeight: 300,
    },
    button: {
        padding: 10,
        borderWidth: 3,
        borderRadius: 14,
        marginBottom: 10,
        width: '45%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 130,
        height: 130,
    },
    button1: {
        height: 48,
        width: 376,
        backgroundColor: 'rgb(62, 6, 136)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textbutton2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    button2: {
        height: 48,
        width: 376,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 50,
        marginLeft: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
});