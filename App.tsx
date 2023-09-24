import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useState} from 'react';
import StartPage from './src/pages/StartPage';
import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';
import LikePage from './src/pages/LikePage';
import MapPage from './src/pages/MapPage';
import ProfilePage from './src/pages/ProfilePage';
import MainPage from './src/pages/MainPage';
import CategoryPage from './src/pages/CategoryPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import RestListPage from './src/pages/RestListPage';
import {Screen, screensEnabled} from 'react-native-screens';
import {Image, Pressable, Text, View} from 'react-native';
import SearchPage from './src/pages/SearchPage';
import MainStack from './src/components/MainStack';
import MainStackList from './src/components/MainStack';

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
