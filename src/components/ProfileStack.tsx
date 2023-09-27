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
import UpdatePage from '../pages/UpdatePage';
import MainTabNavigator from './MainTabNavigator';

export type ProfilePageStackParamList = {
  RestPage: undefined;
  UpdatePage: undefined;
  ProfilePage: undefined;
};

const Stack2 = createNativeStackNavigator<ProfilePageStackParamList>();

function ProfileStackList() {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
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
      <Stack2.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{headerShown: false}}
      />
      <Stack2.Screen
        name="UpdatePage"
        component={UpdatePage}
        options={{headerShown: false}}
      />
    </Stack2.Navigator>
  );
}
