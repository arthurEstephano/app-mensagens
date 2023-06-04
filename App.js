import AppList from './src/AppList';
import AppForm from './src/AppForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppHome from './src/AppHome';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
        name="AppHome"
        component={AppHome}
        options={{title: 'Login'}}>
        </Stack.Screen>
        <Stack.Screen
        name="AppList"
        component={AppList}
        options={{title: 'Welcome'}}>
        </Stack.Screen>
        <Stack.Screen
        name="AppForm"
        component={AppForm}
        options={{title: 'Formulário'}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};