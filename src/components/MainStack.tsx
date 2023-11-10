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
import AddRestPage from '../pages/AddRestPage';
import AuthRegisterPage from '../pages/AuthRegisterPage';
import WriteReviewPage from '../pages/WriteReviewPage';
import WriteLiveReviewPage from '../pages/WriteLiveReviewPage';
import AuthRequestPage from '../pages/AuthRequestPage';
import AddRestWritePage from '../pages/AddRestWritePage';
import WriteReviewSearchPage from '../pages/WriteReviewSearchPage';
import WriteLiveReviewSearchPage from '../pages/WriteLiveReviewSearchPage';

export type MainPageStackParamList = {
  MainPage: undefined;
  MainTabNavigator: undefined;
  RestListPage: {screen: string};
  SearchPage: undefined;
  RestPage: {storeid: number};
  KoreaFoodPage: undefined;
  UpdatePage: undefined;
  ProfilePage: undefined;
  CategoryPage: undefined;
  AddRestPage: undefined;
  AuthRegisterPage: undefined;
  WriteReviewPage: undefined;
  WriteLiveReviewPage: undefined;
  AuthRequestPage: undefined;
  AddRestWritePage: undefined;
  WriteReviewSearchPage: undefined;
  WriteLiveReviewSearchPage: undefined;
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
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="UpdatePage"
        component={UpdatePage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="CategoryPage"
        component={CategoryPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="AddRestPage"
        component={AddRestPage}
        options={{headerShown: true}}
      />
      <Stack1.Screen
        name="AuthRegisterPage"
        component={AuthRegisterPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="WriteReviewPage"
        component={WriteReviewPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="WriteLiveReviewPage"
        component={WriteLiveReviewPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="AuthRequestPage"
        component={AuthRequestPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="AddRestWritePage"
        component={AddRestWritePage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="WriteReviewSearchPage"
        component={WriteReviewSearchPage}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="WriteLiveReviewSearchPage"
        component={WriteLiveReviewSearchPage}
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
