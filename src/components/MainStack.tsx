import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Image, Pressable, TextInput} from 'react-native';
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
import UpdatePage from '../pages/UpdatePage';

export type MainPageStackParamList = {
  MainPage: undefined;
  MainTabNavigator: undefined;
  RestListPage: {screen: string};
  SearchPage: undefined;
  RestPage: undefined;
  KoreaFoodPage: undefined;
  UpdatePage: undefined;
  ProfilePage: undefined;
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
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: () => (
            <IconTextInput
              placeholder="오늘은 어디로?"
              iconName="search-outline"
            />
          ),
          headerRight: () => (
            <View style={{}}>
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
        name="RestPage"
        component={RestPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="UpdatePage"
        component={UpdatePage}
        options={{headerShown: false}}
      />
    </Stack1.Navigator>
  );
}

interface IconTextInputProps {
  iconName: string; // iconName 프로퍼티의 타입을 string으로 명시적으로 지정
  placeholder: string;
}

const IconTextInput: React.FC<IconTextInputProps> = ({
  iconName,
  placeholder,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderRadius: 10,
        paddingHorizontal: 15,
      }}>
      <Ionicons name={iconName} size={20} color="black" />
      <TextInput
        placeholder={placeholder}
        style={{height: 40, color: 'black'}}
      />
    </View>
  );
};

export default MainStackList;
