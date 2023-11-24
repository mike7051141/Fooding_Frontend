import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import KoreaFoodPage from './RestListPage/KoreaFoodPage';
import ChinaFoodPage from './RestListPage/ChinaFoodPage';
import ItalyFoodPage from './RestListPage/ItalyFoodPage';
import JapanFoodPage from './RestListPage/JapanFoodPage';
import LateNightFoodPage from './RestListPage/LateNightFoodPage';
import DessertPage from './RestListPage/DessertPage';
import ChickenPage from './RestListPage/ChickenPage';
import PizzaPage from './RestListPage/PizzaPage';
import SnackFoodPage from './RestListPage/SnackFoodPage';
import FastFoodPage from './RestListPage/FastFoodPage';
import {useRoute} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function RestListPage() {
  const route = useRoute();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true, // 스크롤 가능하도록 설정
        tabBarItemStyle: {width: 100}, // 탭 너비 자동 조정
        swipeEnabled: false,
      }}>
      <Tab.Screen
        name="Korea"
        component={KoreaFoodPage}
        options={{
          title: '한식',
        }}
      />
      <Tab.Screen
        name="China"
        component={ChinaFoodPage}
        options={{title: '중식'}}
      />
      <Tab.Screen
        name="Italy"
        component={ItalyFoodPage}
        options={{title: '양식'}}
      />
      <Tab.Screen
        name="Japan"
        component={JapanFoodPage}
        options={{title: '일식'}}
      />
      <Tab.Screen
        name="LateNight"
        component={LateNightFoodPage}
        options={{title: '야식'}}
      />
      <Tab.Screen
        name="Dessert"
        component={DessertPage}
        options={{title: '디저트'}}
      />
      <Tab.Screen
        name="Chicken"
        component={ChickenPage}
        options={{title: '치킨'}}
      />
      <Tab.Screen
        name="Pizza"
        component={PizzaPage}
        options={{title: '피자'}}
      />
      <Tab.Screen
        name="SnackFood"
        component={SnackFoodPage}
        options={{title: '분식'}}
      />
      <Tab.Screen
        name="FastFood"
        component={FastFoodPage}
        options={{title: '패스트푸드'}}
      />
    </Tab.Navigator>
  );
}
export default RestListPage;
