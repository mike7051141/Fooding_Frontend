import React, {useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
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

const Tab = createMaterialTopTabNavigator();

function RestPage() {
  return (
    /* <Tab.Navigator>
        <Tab.Screen
          name="RestFoodPage"
          component={RestFoodPage}
          options={{title: '메뉴'}}
        />
        <Tab.Screen
          name="RestMapPage"
          component={RestMapPage}
          options={{title: '길찾기'}}
        />
        <Tab.Screen
          name="RestReviewPage"
          component={RestReviewPage}
          options={{title: '후기'}}
        />
        <Tab.Screen
          name="RestLivePage"
          component={RestLivePage}
          options={{title: '실시간 리뷰'}}
        />
      </Tab.Navigator> */
    <RestHomePage />
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
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{}}>
        <View>
          <View style={{}}>
            <Image source={require('../assets/RestImage.png')} />
          </View>
          <View
            style={{
              marginHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              marginTop: 10,
              paddingBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 8}}>
                <Text
                  style={{fontWeight: 'bold', color: 'black', fontSize: 25}}>
                  가게 이름
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Ionicons
                  name="heart-outline"
                  size={30}
                  color={'black'}
                  style={{marginRight: 15}}
                />
                <Ionicons name="map-outline" size={30} color={'black'} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="star" size={25} color={'#E7D532'} />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 15,
                  marginLeft: 10,
                }}>
                4.7(231)
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              paddingVertical: 10,
            }}>
            <View style={{flex: 7, flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="storefront-outline" size={25} color={'black'} />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 15,
                  marginLeft: 5,
                }}>
                가게주소
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <Ionicons name="location-outline" size={25} color={'black'} />
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                287m
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              paddingVertical: 10,
            }}>
            <Ionicons name="time-outline" size={25} color={'black'} />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 15,
                marginLeft: 5,
              }}>
              영업 종료 : 04:30
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              paddingVertical: 10,
            }}>
            <Ionicons name="call-outline" size={25} color={'black'} />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 15,
                marginLeft: 5,
              }}>
              010 - 3168 - 7488
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'flex-start',
              paddingVertical: 10,
              marginBottom: 20,
            }}>
            <Ionicons name="reader-outline" size={25} color={'black'} />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 13,
                marginRight: 20,
              }}
              numberOfLines={line}
              ellipsizeMode="tail"
              onPress={() => handleLine()}>
              진심을 담은 한상차림!진심을 담은 한상차림!진심을 담은
              한상차림!진심을 담은 한상차림!진심을 담은 한상차림!진심을 담은
              한상차림!진심을 담은 한상차림!진심을 담은 한상차림!진심을 담은
              한상차림!한상차림!진심을 담은 한상차림!진심을 담은 한상차림!진심을
              담은 한상차림!한상차림!진심을 담은 한상차림!진심을 담은
              한상차림!진심을 담은 한상차림!
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            alignItems: 'center',
            borderColor: 'lightgray',
            borderWidth: 1,
            padding: 15,
          }}>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestFoodPage')}>
            <Text style={styles.ListText}>메뉴</Text>
          </Pressable>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestMapPage')}>
            <Text style={styles.ListText}>길찾기</Text>
          </Pressable>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestReviewPage')}>
            <Text style={styles.ListText}>후기</Text>
          </Pressable>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestLivePage')}>
            <Text style={styles.ListText}>실시간 리뷰</Text>
          </Pressable>
        </View>
        <View>
          {currentPage === 'RestFoodPage' && <RestFoodPage />}
          {currentPage === 'RestMapPage' && <RestMapPage />}
          {currentPage === 'RestReviewPage' && <RestReviewPage />}
          {currentPage === 'RestLivePage' && <RestLivePage />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ListText: {
    color: 'black',
    fontWeight: 'bold',
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default RestPage;
