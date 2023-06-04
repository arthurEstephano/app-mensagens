import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
export default function AppList() {

const navigation = useNavigation();

const retornarList = () => {
    navigation.navigate('AppHome');
}
    return (
        <View style={styles.container}>
            <Text style={styles.init}>Mensagens</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#A6ADAE'
    },
    init: {
        alignSelf: 'center',
        marginTop: 120,
        marginBottom: 80,
    },
});