import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from "axios";

export default function AppForm() {
    const navigation = useNavigation();

    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");
    const [apelido, setApelido] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");


    const retornarHome = () => {
        navigation.navigate('AppHome');
    }

    const retornarList = () => {
        navigation.navigate('AppList');
    }


    const baseURL = "http://192.168.0.222:8080/";
    const [post, setPost] = React.useState(null);
    const [error, setError] = React.useState(null);

    function createPost() {
        axios.post(`${baseURL}user/`, {
            nome: nome,
            apelido: apelido,
            avatar: null,
            senha: password,
            email: email,
            telefone: telefone
        })
            .then((response) => {
                setPost(response.data);
                if (response.status == 200) {
                    retornarList();
                }
            }).catch(error => {
                setError(error);
            });
        if (error) return (console.log(`Error: ${error.message}`));
    }


    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <TouchableOpacity
                    onPress={() => retornarHome()}
                >
                    <Text style={styles.buttonTextCancelar}>Cancelar</Text>
                </TouchableOpacity>
                <Image style={styles.img} source={require('../../assets/logo.jpg')} />
                <TouchableOpacity
                    onPress={() => createPost()}
                >
                    <Text style={styles.buttonTextAdicionar}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={styles.scrollContainer}
                contentContainerStyle={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    keyboardType="default"
                    textContentType="name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(nome) => setNome(nome)}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(telefone) => setTelefone(telefone)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apelido"
                    keyboardType="default"
                    textContentType="nickname"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(apelido) => setApelido(apelido)}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        backgroundColor: '#A6ADAE'
    },
    img: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    scrollContainer: {
        flex: 1,
        width: '100%'
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
    buttonTextCancelar: {
        color: "#14099F",
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 15
    },
    buttonTextAdicionar: {
        color: "#14099F",
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 15
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        alignContent: 'stretch'
    },
});