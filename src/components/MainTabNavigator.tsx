import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
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
import AddRestPage from '../pages/AddRestPage';
import AuthRegisterPage from '../pages/AuthRegisterPage';
import AuthRequestPage from '../pages/AuthRequestPage';
import WriteReviewPage from '../pages/WriteReviewPage';
import WriteLiveReviewPage from '../pages/WriteLiveReviewPage';
import WriteReviewSearchPage from '../pages/WriteReviewSearchPage';
import WriteLiveReviewSearchPage from '../pages/WriteLiveReviewSearchPage';

import {useNavigation} from '@react-navigation/native';
import AddRestWritePage from '../pages/AddRestWritePage';
import StoreInfoEditPage from '../pages/StoreInfoEditPage';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const navigation = useNavigation();
  const goToBack = () => {
    navigation.goBack();
  };

  // const customHeader = ({title}) => {
  //   return (

  //   )
  // };

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

          return (
            <TouchableOpacity>
              <Ionicons name={iconName} size={size} color={iconColor} />
            </TouchableOpacity>
          );
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
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={33}
              color="black"
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="MapPage"
        component={MapPage}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'location' : 'location-outline'}
              size={33}
              color="black"
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="CategoryPage"
        component={CategoryPage}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'close-circle' : 'add-circle'}
              size={40}
              color={focused ? 'white' : '#B6BE6A'} // focused 상태에 따라 색상을 변경합니다.
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="LikePage"
        component={LikePage}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={33}
              color={'black'}
            />
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
            borderColor: 'gray',
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
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={33}
              color={'black'}
            />
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
            borderColor: 'gray',
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
      <Tab.Screen
        name="AddRestPage"
        component={AddRestPage}
        options={{
          title: '식당 추가',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'lightgray',
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => goToBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          headerShown: true,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="AddRestWritePage"
        component={AddRestWritePage}
        options={{
          title: '식당 추가',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'lightgray',
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => goToBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          headerShown: true,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="StoreInfoEditPage"
        component={StoreInfoEditPage}
        options={{
          title: '식당 정보 수정',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'lightgray',
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => goToBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          headerShown: true,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="AuthRegisterPage"
        component={AuthRegisterPage}
        options={{
          title: '권한 등록',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'lightgray',
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => goToBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          headerShown: true,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="AuthRequestPage"
        component={AuthRequestPage}
        options={{
          title: '권한 신청',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'lightgray',
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => goToBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          headerShown: true,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="WriteReviewPage"
        component={WriteReviewPage}
        options={{
          title: '후기 작성',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'lightgray',
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => goToBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          headerShown: true,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="WriteLiveReviewPage"
        component={WriteLiveReviewPage}
        options={{
          title: '실시간 리뷰 작성',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          },
          headerStyle: {
            borderBottomWidth: 1.5,
            borderColor: 'lightgray',
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          headerShown: true,
          tabBarButton: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="WriteReviewSearchPage"
        component={WriteReviewSearchPage}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => goToBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.Container}>
              <TextInput
                placeholder="검색"
                style={styles.SearchInput}
                placeholderTextColor={'black'}></TextInput>
            </View>
          ),
          headerShown: true, // 헤더 보여주기 여부 결정
          tabBarShowLabel: false, // 탭바 아이콘들 밑 텍스트 출력 여부 결정
          tabBarButton: () => null, // 탭바 아이콘 갯수 추가 여부 결정
        }}
      />
      <Tab.Screen
        name="WriteLiveReviewSearchPage"
        component={WriteLiveReviewSearchPage}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  Container: {},
  SearchInput: {
    width: 250,
    height: 38,
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: 'lightgray',
  },
});

export default MainTabNavigator;
