import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screen/Login';
import Register from '../screen/Register';
import ListFriend from '../screen/Listfriend';
import Loading from '../screen/Loading';

const Stack = createStackNavigator();

export default class Mystack extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={Login.hiddenLogin}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={Login.hiddenLogin}
          />
          <Stack.Screen
            name="Listfriend"
            component={ListFriend}
            options={Login.hiddenLogin}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
