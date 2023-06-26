import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Text, View, TextInput, Image } from "react-native";

export default function AppNew() {

    const navigation = useNavigation();
    const [msg, setMsg] = useState([]);
    const [id, setId] = useState("");
    const [post, setPost] = React.useState(null);
    const baseURL = "http://192.168.0.222:8080/";

    const retornarList = () => {
        navigation.navigate('AppList');
    }

    async function createPost() {
        const idUsuario = await AsyncStorage.getItem('idUsuario')
        await axios.post(`${baseURL}message/enviarMensagem`, {
            idFrom: idUsuario,
            idTo: id,
            mensagem: msg
        })
            .then((response) => {
                setPost(response.data);
                if (response.status == 200) {
                    setMsg('')
                    retornarList()
                }
                else
                    alert("Mensagen não enviada.")
            }).catch((e) => {
                console.log("An error ocurred on the createPost method: ", e)
            });
    }

    const KEYBOARD_AVOIDING_BEHAVIOR = Platform.select({
        ios: 'padding',
        android: 'height',
    });

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/logo.jpg')} />
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={styles.scrollContainer}
                contentContainerStyle={styles.inputContainer}>
                <View style={styles.line}>
                    <Text>Id </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="id"
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(id) => setId(id)}
                    />
                </View>
                <View style={styles.line}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mensagem"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(msg) => setMsg(msg)}
                        multiline
                    >
                    </TextInput>
                </View>
                <View style={styles.buttons}>
                <KeyboardAvoidingView
                behavior={KEYBOARD_AVOIDING_BEHAVIOR}
                keyboardVerticalOffset={1}>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => createPost()}>
                        <Text style={styles.buttonLogar}>Enviar Mensagem!</Text>
                    </TouchableOpacity>
                    </SafeAreaView>
                    </KeyboardAvoidingView>
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