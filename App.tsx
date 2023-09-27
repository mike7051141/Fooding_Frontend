import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useState} from 'react';
import StartPage from './src/pages/StartPage';
import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';
import MainStackList from './src/components/MainStack';
import usePermissions from './src/hooks/usePermissions';

export type RootStackParamList = {
  StartPage: undefined;
  LoginPage: undefined;
  SignUpPage: undefined;
};

export type RestListPagekParamList = {
  RestListPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  usePermissions();
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStackList />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="StartPage"
            component={StartPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
