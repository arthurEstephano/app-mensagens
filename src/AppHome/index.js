import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
export default function AppHome() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const retornarList = () => {
        navigation.navigate('AppForm');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/logo.jpg')} />
            <View style={styles.line}>
                <Text>Email </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    autoCorrect={false}
                    onChangeText={(email) => setEmail(email)}
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
                <TouchableOpacity onPress={() => retornarList()}>
                    <Text style={styles.buttonLogar}>Logar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => retornarList()}>
                    <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#A6ADAE'
    },
    img: {
        alignSelf: 'center',
        marginTop: 120,
        marginBottom: 80,
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    input: {
        height: 50,
        flex: 1,
        padding: 30,
        marginLeft: 5,
        backgroundColor: '#D9D9D9',
        color: '#000',
        textDecorationColor: '#000',
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