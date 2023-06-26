import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function AppMessage(props) {


    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Text style={styles.textName}>{props.nomeFrom}</Text>
                <View style={styles.textWrap}>
                <Text style={styles.textItem}>{props.message}</Text>
                </View>
                <Text style={styles.textDataHora}>{props.dataHora}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A6ADAE',
        paddingBottom: 10,
        marginTop: 10,
        width: '100%'
    },
    line: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 2,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#fff1',
        backgroundColor: '#FFD700',
    },
    textWrap: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 1

    },
    textName: {
        fontSize: 20,
        color: '#000',
    },
    textItem: {
        fontSize: 20,
        color: '#FF00FF',
    },
    textDataHora: {
        fontSize: 20,
        color: '#000',
    }
})