import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import Settings from '../screens/Settings';
import UpdateCards from '../screens/UpdateCards';
import Card from '../screens/Card';
import Info from '../screens/Info'

import Quest1 from '../screens/Quest1';
import Quest2 from '../screens/Quest2';
import Quest3 from '../screens/Quest3';
import Quest4 from '../screens/Quest4';
import Quest5 from '../screens/Quest5';

const Stack = createStackNavigator();

const AppContainer = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"

        screenOptions={{ headerShown: false }}
        keyboardHandlingEnabled={true}>

          
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="UpdateCards" component={UpdateCards} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="Quest1" component={Quest1} />
        <Stack.Screen name="Quest2" component={Quest2} />
        <Stack.Screen name="Quest3" component={Quest3} />
        <Stack.Screen name="Quest4" component={Quest4} />
        <Stack.Screen name="Quest5" component={Quest5} />

      </Stack.Navigator>
    </NavigationContainer>
  )
  
export default AppContainer;