import 'react-native-gesture-handler';
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './src/screens/LoginScreen';
// import SignUpScreen from './src/screens/SignUpScreen';
import AppNavigator from './src/navigation/AppNavigator';

//const Stack = createStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen
    //       name="Login"
    //       component={LoginScreen}
    //       options={{ title: '로그인' }}
    //     />
    //     <Stack.Screen
    //       name="SignUp"
    //       component={SignUpScreen}
    //       options={{ title: '회원가입' }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <AppNavigator />
  );
};

export default App;
