import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MainTabNavigator from '../components/MainTabNavigator';
import MainPage from './MainPage';
import RestListPage from './RestListPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryPage from './CategoryPage';
import LikePage from './LikePage';
import MapPage from './MapPage';
import ProfilePage from './ProfilePage';
import {ScrollView} from 'react-native';
import RestFoodPage from './RestFoodPage';
import RestLivePage from './RestLivePage';
import RestMapPage from './RestMapPage';
import RestReviewPage from './RestReviewPage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import SearchPage from './SearchPage';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function AuthRequestPage() {
  return (
    <View>
      <RestHomePage />
    </View>
  );
}

const RestHomePage = () => {
  const [currentPage, setCurrentPage] = useState('');

  // 메뉴 항목을 클릭할 때 해당 페이지로 전환하는 함수
  const changePage = (pageName: string) => {
    setCurrentPage(pageName);
  };

  const [line, setLine] = useState(3);
  const [isActivated, setIsActivated] = useState(false);

  const handleLine = () => {
    isActivated ? setLine(3) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated(prev => !prev);
  };

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'white'}}>
        <View>
          <View style={{}}>
            <Image source={require('../assets/RestImage.png')} />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              paddingBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: 'black', fontSize: 25}}>
                  땀땀
                </Text>
              </View>
              <View style={{marginLeft: 20, marginTop: 5}}>
                <Text style={{color: 'black'}}>
                  서울 서초구 서초대로77길 55 102호
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Ionicons
                name="person-outline"
                size={25}
                color={'black'}
                style={{flex: 1}}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  padding: 5,
                  flex: 8,
                  marginLeft: 10,
                }}
                placeholder=" 이름을 입력하세요"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Ionicons
                name="mail-outline"
                size={25}
                color={'black'}
                style={{flex: 1}}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  padding: 5,
                  flex: 8,
                  marginLeft: 10,
                }}
                placeholder=" 이메일을 입력하세요"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Ionicons
                name="call-outline"
                size={25}
                color={'black'}
                style={{flex: 1}}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  padding: 5,
                  flex: 8,
                  marginLeft: 10,
                }}
                placeholder=" 전화번호를 입력하세요"
              />
            </View>
            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <Ionicons name="images-outline" size={25} color={'black'} />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 18,
                  marginLeft: 10,
                }}>
                사업자 등록증 사진을 추가해주세요
              </Text>
            </View>

            {/* 이곳에 사업자 등록증 사진 추가 UI를 구현하세요 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 20,
              }}>
              {/* "신청" button */}
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 60,
                  backgroundColor: '#B6BE6A',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  // Handle button click here
                  // Add the logic for the "신청" action
                }}>
                <Text style={{color: 'white', fontSize: 16}}>신청</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ListText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  Scrollstar: {
    color: 'gray',
  },
  selectedButtonText: {
    color: 'black',
  },
});

export default AuthRequestPage;
