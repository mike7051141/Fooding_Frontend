import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RestListPage from '../pages/RestListPage';
import SearchPage from '../pages/SearchPage';
import {NavigationContainer} from '@react-navigation/native';
import CategoryPage from '../pages/CategoryPage';
import LikePage from '../pages/LikePage';
import MainPage from '../pages/MainPage';
import MapPage from '../pages/MapPage';
import ProfilePage from '../pages/ProfilePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RestPage from '../pages/RestPage';
import MainTabNavigator from './MainTabNavigator';

export type MainPageStackParamList = {
  MainPage: undefined;
  MainTabNavigator: undefined;
  RestListPage: {screen: string};
  SearchPage: undefined;
  RestPage: undefined;
  KoreaFoodPage: undefined;
};

const Tab = createBottomTabNavigator();
const Stack1 = createNativeStackNavigator<MainPageStackParamList>();

function MainStackList() {
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="RestListPage"
        component={RestListPage}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: () => (
            <Image
              source={require('../assets/FoodingLogin.png')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 60,
              }}
            />
          ),
          headerRight: () => (
            <View>
              <Pressable
                onPress={() => {
                  navigation.navigate('MainPage');
                }}>
                <Ionicons name="home-outline" size={25} color={'black'} />
              </Pressable>
            </View>
          ),
        })}
      />
      <Stack1.Screen
        name="SearchPage"
        component={SearchPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="RestPage"
        component={RestPage}
        options={({navigation}) => ({
          headerShown: true,
          title: '',
          headerRight: () => (
            <View>
              <Pressable
                onPress={() => {
                  navigation.navigate('MainPage');
                }}>
                <Ionicons name="create-outline" size={25} color={'black'} />
              </Pressable>
            </View>
          ),
        })}
      />
    </Stack1.Navigator>
  );
}

export default MainStackList;
