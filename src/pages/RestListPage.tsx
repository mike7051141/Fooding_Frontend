import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import KoreaFoodPage from './RestListPage/KoreaFoodPage';
import ChinaFoodPage from './RestListPage/ChinaFoodPage';
import FoodPage1 from './RestListPage/FoodPage1';
import FoodPage2 from './RestListPage/FoodPage2';
import FoodPage3 from './RestListPage/FoodPage3';
import FoodPage4 from './RestListPage/FoodPage4';
import FoodPage5 from './RestListPage/FoodPage5';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const Tab = createMaterialTopTabNavigator();

function RestListPage() {
  const route = useRoute();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true, // 스크롤 가능하도록 설정
        tabBarItemStyle: {width: 80}, // 탭 너비 자동 조정
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
        name="FoodPage1"
        component={FoodPage1}
        options={{title: '양식'}}
      />
      <Tab.Screen
        name="FoodPage2"
        component={FoodPage2}
        options={{title: '일식'}}
      />
      <Tab.Screen
        name="FoodPage3"
        component={FoodPage3}
        options={{title: '야식'}}
      />
      <Tab.Screen
        name="FoodPage4"
        component={FoodPage4}
        options={{title: '디저트'}}
      />
      <Tab.Screen
        name="FoodPage5"
        component={FoodPage5}
        options={{title: '치킨'}}
      />
    </Tab.Navigator>
  );
}
export default RestListPage;
function useBackHandler(handleBackButton: () => boolean) {
  throw new Error('Function not implemented.');
}
