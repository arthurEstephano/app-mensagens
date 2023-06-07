import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppHome() {
    const navigation = useNavigation();

    const [telefone, setTelefone] = useState("");
    const [password, setPassword] = useState("");

    const retornarForm = () => {
        navigation.navigate('AppForm');
    }

    const retornarList = () => {
        navigation.navigate('AppList');
    }

    const baseURL = "http://192.168.0.222:8080/";
    const [get, setGet] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [errorCompare, setErrorCompare] = React.useState(null);

    useEffect(() => {
        compareHash();
    }, [])


    function getUserByPhoneAndPasswd() {
        axios.get(`${baseURL}user/${telefone}/${password}`)
            .then((response) => {
                setGet(response.data);
                AsyncStorage.setItem('idUsuario', JSON.stringify(response.data.id)).then(res => { console.log(response.data.id) })
                if (response.status == 200) {
                    getHash(response.data.id)
                }
            }).catch(error => {
                setError(error);
            });
        if (error) return (console.log(`Error: ${error.message}`));
    }

    function getHash(dataResponse) {
        axios.get(`${baseURL}user/${dataResponse}`)
            .then((response) => {
                if (response.status == 200) {
                    AsyncStorage.setItem('hashUsuario', JSON.stringify(response.data)).then(res => { console.log(response.data) })
                    retornarList();
                }
            }).catch(error => {
                setError(error);
            });
        if (error) return (console.log(`Error: ${error.message}`));
    }

    const compareHash = async () => {
        try {
            hashUsuario = await AsyncStorage.getItem('hashUsuario')
            idUsuario = await AsyncStorage.getItem('idUsuario')
            let actualHash = '';
            axios.get(`${baseURL}user/` + Number(idUsuario))
                .then((response) => {
                    actualHash = JSON.stringify(response.data)
                    if (hashUsuario === actualHash) {
                        console.log(hashUsuario)
                        console.log(idUsuario)
                        retornarList();
                    }
                }).catch(error => {
                    setErrorCompare(errorCompare);
                });
            if (error) return (console.log(`Error: ${error.message}`));
        }
        catch (e) {
            alert('Error: Hash diferente do que existe no async storage, você terá que logar de novo.')
        }
    }

    function getHashNow(dataResponse) {

    }




    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/logo.jpg')} />
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={styles.scrollContainer}
                contentContainerStyle={styles.inputContainer}>
                <View style={styles.line}>
                    <Text>Telefone </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(telefone) => setTelefone(telefone)}
                    />
                </View>
                <View style={styles.line}>
                    <Text>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        keyboardType="visible-password"
                        textContentType="password"
                        autoCapitalize="none"
                        autoCompleteType="password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => getUserByPhoneAndPasswd()}>
                        <Text style={styles.buttonLogar}>Logar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => retornarForm()}>
                        <Text style={styles.buttonText}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#A6ADAE'
    },
    scrollContainer: {
        flex: 1,
        width: '100%'
    },
    img: {
        alignSelf: 'center',
        marginTop: 120,
        marginBottom: 20,
    },
    line: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 50,
        alignContent: 'stretch'
    },
    inputContainer: {
        flex: 1,
        marginTop: 5,
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#A6ADAE'
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#D9D9D9',
        color: '#000',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
    },
    buttonLogar: {
        marginRight: 100,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,

        color: '#3379A8',
    },
    buttonText: {
        marginLeft: 100,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,

        color: '#3379A8',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }
});