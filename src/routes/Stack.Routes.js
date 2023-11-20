import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabRoutes from './Tab.Routes';
import Login from '../pages/Login';
import Perfil from '../pages/Perfil';
import Local from '../pages/Local';
import Cadastro from '../pages/Cadastrar';
import MapLocal from '../pages/MapLocal';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='login'
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name='main'
          options={{
            headerShown: false,
          }}
          component={TabRoutes}
        />
        <Stack.Screen
          name='perfil'
          options={{
            headerShown: false,
          }}
          component={Perfil}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='local'
          component={Local}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='mapaLocal'
          component={MapLocal}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='cadastrar'
          component={Cadastro}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}