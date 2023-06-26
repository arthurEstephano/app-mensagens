import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from "react-native";

import AppItem from '../AppItem';

export default function AppList() {

    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const baseURL = "http://192.168.0.222:8080/";

    const retornarList = () => {
        AsyncStorage.clear();
        navigation.navigate('AppHome');
    }

    const getItems = async () => {
        const idUsuario = await AsyncStorage.getItem('idUsuario')
        const user = await axios
          .get(`${baseURL}message/buscarUsuariosComConversa/${idUsuario}`)
          .then(({ data }) => data)
          .catch((e) => {console.log("An error ocurred on the getItems method: ", e)
        return []});

        
        setItems(user);
      };
      

    useEffect(() => {
        getItems();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <TouchableOpacity onPress={() => retornarList()}>
                    <Text style={styles.buttonExit}>Sair</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Contatos</Text>
                <TouchableOpacity onPress={() => retornarList()}>
                    <Text style={styles.buttonAdd}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line}>               
            </View>
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={styles.scrollContainer}
                contentContainerStyle={styles.itemsContainer}>
                {items.map(item => {
                    return <AppItem key={item.id} id={item.id} nome={item.nome} avatar={item.avatar} email={item.email} telefone={item.telefone} item={item.nome + ' ' + item.telefone} />
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A6ADAE'
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 5,
        marginLeft: 25
    },
    buttonAdd: {
        color: "#14099F",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        alignContent: 'flex-end',
        fontSize: 20,
        marginTop: 50,
        marginBottom: 5,
        marginLeft: 15
    },
    buttonExit: {
        color: "#14099F",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        alignContent: 'flex-start',
        fontSize: 20,
        marginTop: 50,
        marginBottom: 5,
        marginRight: 15
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
        borderBottomWidth: 10,
        borderColor: "#666666",
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: '#A6ADAE'
    }

});