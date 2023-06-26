import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from "axios";
import { Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';

export default function AppForm() {
    const navigation = useNavigation();

    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [image, setImage] = useState(null);


    const retornarHome = () => {
        navigation.navigate('AppHome');
    }

    const imageChange = async () => {
        // Pede permissão pro usuário para acessar as fotos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Você recusou a abrir suas fotos!");
            return;
        }

        const response = await ImagePicker.launchImageLibraryAsync({ base64: true, allowsEditing: true, quality: 0.5 });


        if (!response.canceled) {
            setImage(response.assets[0].uri);
            console.log(response.assets[0].uri);
        }
    }

    const cameraChange = async () => {
        // Pede permissão pro usuário para acessar a câmera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Você recusou a abrir sua câmera!");
            return;
        }

        const response = await ImagePicker.launchCameraAsync({ base64: true, allowsEditing: true, quality: 0.5 });

        if (!response.canceled) {
            setImage(response.assets[0].uri);
            console.log(response.assets[0].uri);
        }
    }

    const photoChange = () => {
        Alert.alert('Escolha sua foto de perfil!', 'Selecione de onde gostaria de escolher sua foto.', [
          {
            text: 'Galeria de Fotos',
            style: 'default',
            onPress: () => {imageChange()}
          },
          {
            text: 'Rolo da câmera',
            style: 'default',
            onPress: () => {cameraChange()}
          }
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              'Seleção de imagem cancelada.',
            ),
        });
      }
    

    const baseURL = "http://192.168.0.222:8080/";
    const [post, setPost] = React.useState(null);
    const [error, setError] = React.useState(null);

    function createPost() {
        axios.post(`${baseURL}user/`, {
            nome: nome,
            avatar: image,
            senha: password,
            email: email,
            telefone: telefone
        })
            .then((response) => {
                setPost(response.data);
                if (response.status == 200) {
                    retornarHome();
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
                <TouchableOpacity
                    onPress={() => createPost()}
                >
                    <Text style={styles.buttonTextAdicionar}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageAvatar}>
                <TouchableOpacity onPress={() => photoChange()}>
                    <Avatar
                        size={150}
                        image={{ uri: image }}
                        icon={props => <Icon name="account" {...props} />}>
                    </Avatar>
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
    imageAvatar: {
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
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
        fontSize: 15,
        alignSelf: 'flex-start',
    },
    buttonTextAdicionar: {
        color: "#14099F",
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 15,
        alignSelf: 'flex-end',
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
        marginBottom: 10,
    },
});