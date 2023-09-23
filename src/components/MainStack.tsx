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

export type MainPageStackParamList = {
  MainPage: undefined;
  MainTabNavigator: undefined;
  RestListPage: {screen: string};
  SearchPage: undefined;
};

const Tab = createBottomTabNavigator();
const Stack1 = createNativeStackNavigator<MainPageStackParamList>();

function FoodPage4() {
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
    </Stack1.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'MainPage') {
            iconName = 'home-outline';
          } else if (route.name === 'MapPage') {
            iconName = 'location-outline';
          } else if (route.name === 'CategoryPage') {
            iconName = 'add-circle'; // 카테고리 페이지일 때 아이콘 변경
          } else if (route.name === 'LikePage') {
            iconName = 'heart-outline';
          } else if (route.name === 'ProfilePage') {
            iconName = 'person-outline';
          }

          // 카테고리 페이지일 때 색상 변경
          const iconColor = route.name === 'CategoryPage' ? 'white' : color;

          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        headerShown: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: route.name === 'CategoryPage' ? '#B6BE6A' : 'white',
        },
        activeTintColor: '#B6BE6A',
        inactiveTintColor: 'black',
      })}>
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={33} color={'black'} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="MapPage"
        component={MapPage}
        options={{
          tabBarIcon: () => (
            <Ionicons name="location-outline" size={33} color={'black'} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="CategoryPage"
        component={CategoryPage}
        options={({route}) => ({
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'close-circle' : 'add-circle'}
              size={40}
              color={focused ? 'white' : '#B6BE6A'} // focused 상태에 따라 색상을 변경합니다.
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        })}
      />
      <Tab.Screen
        name="LikePage"
        component={LikePage}
        options={{
          tabBarIcon: () => (
            <Ionicons name="heart-outline" size={33} color={'black'} />
          ),
          title: '좋아요 한',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={33} color={'black'} />
          ),
          title: 'My 푸딩',
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default FoodPage4;
