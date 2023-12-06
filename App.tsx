import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useEffect, useState} from 'react';
import StartPage from './src/pages/StartPage';
import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';
import MainStackList from './src/components/MainStack';
import usePermissions from './src/hooks/usePermissions';
import {LogBox} from 'react-native';

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
  const [isLoggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   LogBox.ignoreAllLogs();
  // }, []);

  const handleLoginSuccess = () => {
    // 로그인이 성공하면 isLoggedIn 값을 true로 업데이트
    setLoggedIn(true);
  };

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
            component={props => (
              <LoginPage {...props} onLoginSuccess={handleLoginSuccess} />
            )}
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
