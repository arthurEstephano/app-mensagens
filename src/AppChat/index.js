import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import AppMessage from '../AppMessage';
import { TextInput } from '@react-native-material/core';

export default function AppChat({ route }) {

    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const baseURL = "http://192.168.0.222:8080/";
    const [id, setId] = useState('');
    const [msg, setMsg] = useState([]);
    const [post, setPost] = React.useState(null);

    const retornarList = () => {
        navigation.navigate('AppList');
    }


    function createPost() {
        axios.post(`${baseURL}message/enviarMensagem`, {
            idFrom: idUsuario,
            idTo: id,
            mensagem: msg
        })
            .then((response) => {
                setPost(response.data);
                if (response.status == 200) {
                    setMsg('')
                    getMessages()
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


    const getMessages = async () => {
        try {
            const idUsuario = await AsyncStorage.getItem('idUsuario')
            const idOutro = route.params.id
            setId(idOutro)
            const mensagens = await axios
                .get(`${baseURL}message/buscarMensagensComUmUsuario/${idUsuario}` + `/${idOutro}`)
                .then(({ data }) => {
                    data.sort((a, b) => a.dataHora.localeCompare(b.dataHora));
                    return data;
                })
                .catch((e) => {
                    console.log("An error ocurred on the getMessages method: ", e)
                    return []
                });

            setItems(mensagens);
        } catch (error) {

        }
    };


    useEffect(() => {
        getMessages();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <TouchableOpacity onPress={() => retornarList()}>
                    <Text style={styles.buttonExit}>Sair</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Chat privado</Text>
            </View>
            <View style={styles.line}>
            </View>
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={styles.scrollContainer}
                contentContainerStyle={styles.itemsContainer}>
                {items.map(items => {
                    return <AppMessage key={items.id} id={items.id} idFrom={items.from.id} nomeFrom={items.from.nome} message={items.mensagem} time={items.dataHora} />
                })}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={KEYBOARD_AVOIDING_BEHAVIOR}
                keyboardVerticalOffset={1}>
                <SafeAreaView>
                    <View style={styles.bottomLine}>
                        <ScrollView overScrollMode="auto"
                        automaticallyAdjustContentInsets={true}
                        bounces={false}
                        scrollToOverflowEnabled={true} 
                        persistentScrollbar={true}
                        contentContainerStyle={{flexGrow: 1}}>
                            <TextInput
                                placeholder="Mensagem"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(msg) => setMsg(msg)}
                                multiline
                            >
                            </TextInput>
                        </ScrollView>
                        <TouchableOpacity onPress={() => createPost()} style={styles.icon}>
                            <Icon name="arrow-right" size={50} color="black"></Icon>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A6ADAE'
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    title: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 5,
        marginLeft:30,
        alignItems: 'center',
    },
    icon: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    buttonExit: {
        color: "#14099F",
        fontSize: 35,
        marginTop: 50,
        marginBottom: 5,
        alignItems: 'flex-start',
        marginLeft: 10

    },
    scrollContainer: {
        flex: 1,
        width: '90%'
    },
    itemsContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 50,
        padding: 20,
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: '#A6ADAE'
    },
    bottomLine: {
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: 'transparent',
        borderTopColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5
    },


});