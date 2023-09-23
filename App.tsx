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

export type RootStackParamList = {
  StartPage: undefined;
  LoginPage: undefined;
  SignUpPage: undefined;
};

export type MainStackParamList = {
  MainPage: undefined;
  LikePage: undefined;
  MapPage: undefined;
  ProfilePage: undefined;
  CategoryPage: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="MainPage"
            component={MainPage}
            options={{
              tabBarIcon: () => (
                <Ionicons name="home-outline" size={30} color={'black'} />
              ),

              headerShown: false,
            }}
          />
          <Tab.Screen
            name="MapPage"
            component={MapPage}
            options={{
              tabBarIcon: () => (
                <Ionicons name="location-outline" size={30} color={'black'} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="CategoryPage"
            component={CategoryPage}
            options={{
              tabBarIcon: () => (
                <Ionicons name="add-circle" size={30} color={'green'} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="LikePage"
            component={LikePage}
            options={{
              tabBarIcon: () => (
                <Ionicons name="heart-outline" size={30} color={'black'} />
              ),
              title: '좋아요 한',
            }}
          />
          <Tab.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{
              tabBarIcon: () => (
                <Ionicons name="person-outline" size={30} color={'black'} />
              ),
              title: 'My 푸딩',
            }}
          />
        </Tab.Navigator>
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
