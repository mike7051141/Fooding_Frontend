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

const Tab = createBottomTabNavigator();

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
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'black',
            backgroundColor: '#B6BE6A',
          },
          tabBarShowLabel: false,
          headerShown: true,
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
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'black',
            backgroundColor: '#B6BE6A',
          },
          tabBarShowLabel: false,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="RestPage"
        component={RestPage}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
