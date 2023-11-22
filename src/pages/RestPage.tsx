import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
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
import StoreInfoEditPage from './StoreInfoEditPage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import SearchPage from './SearchPage';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {retrieveToken} from '../store/storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib'; // geolib 라이브러리 추가

const Tab = createMaterialTopTabNavigator();

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'StoreInfoEditPage'
>;

function RestPage({navigation}: MainPageScreenProps) {
  const toStoreInfoEditPage = (storeId: number, resetState: boolean) => {
    navigation.navigate('StoreInfoEditPage', {
      storeid: storeId,
      resetState: resetState,
    });
  };
  const [currentPage, setCurrentPage] = useState('');
  const [address, setAddress] = useState<string>(''); // State to store the input address
  const [closeHour, setCloseHour] = useState<string>('');
  const [storeNumber, setStoreNumber] = useState<string>('');
  const [storeContent, setStoreContent] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const [line, setLine] = useState(3);
  const [isActivated, setIsActivated] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // 버튼의 상태를 추적하는 새로운 상태

  const handleLine = () => {
    isActivated ? setLine(3) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated(prev => !prev);
  };

  const navigation2 = useNavigation();
  const goBack = () => {
    navigation2.goBack();
  };
  const route = useRoute();
  const storeId = route.params.storeid;
  const copyStoreId = storeId;
  const [restData, setRestData] = useState(null); // 서버에서 받아온 식당 이름 저장

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.27566,
    longitude: 127.13245,
  }); // 초기 값으로 P0를 설정합니다.

  // 사용자의 현재 위치를 가져오는 함수
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        console.log('업데이트');
      },
      error => {
        console.error('Error getting current location: ', error);
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();

    // 10초마다 현재 위치 업데이트
    const updateLocationInterval = setInterval(() => {
      getCurrentLocation();
    }, 10000);

    return () => {
      clearInterval(updateLocationInterval); // 컴포넌트 언마운트 시 타이머 해제
    };
  }, []);

  useEffect(() => {
    if (
      currentLocation.latitude &&
      currentLocation.longitude &&
      latitude &&
      longitude
    ) {
      const dist = getDistance(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        {latitude: parseFloat(latitude), longitude: parseFloat(longitude)},
      );

      // 거리를 킬로미터로 변환
      const distanceInKm = dist / 1000;

      setDistance(distanceInKm);
    }
  }, [
    currentLocation.latitude,
    currentLocation.longitude,
    latitude,
    longitude,
  ]);

  // 메뉴 항목을 클릭할 때 해당 페이지로 전환하는 함수
  const changePage = (pageName: string) => {
    console.log('RestPage에서 넘길 storeid : ', copyStoreId);
    setCurrentPage(pageName);
  };

  useEffect(() => {
    console.log('RestPage에서 받은 storeid : ', copyStoreId);
    const fetchData = async () => {
      try {
        const token = await retrieveToken(); // 여기에 토큰을 설정합니다.
        //console.log(token);
        const response = await axios.get(
          `http://kymokim.iptime.org:11080/api/store/get/${storeId}`,
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        setRestData(response.data.data.storeName);
        setAddress(response.data.data.address);
        setCloseHour(response.data.data.closeHour);
        setStoreNumber(response.data.data.storeNumber);
        setStoreContent(response.data.data.storeContent);
        setLatitude(response.data.data.latitude);
        setLongitude(response.data.data.longitude);
        //console.log(data);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    fetchData();
  }, [storeId]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={25} color="white" />
        </TouchableOpacity>
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
                  {restData}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'} // 상태에 기반하여 아이콘 변경
                    size={30}
                    color={isLiked ? 'red' : 'black'}
                    onPress={() => setIsLiked(prev => !prev)} // 버튼을 누를 때 상태 토글
                  />
                  <Text style={{color: 'black', marginLeft: 0}}>좋아요</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => toStoreInfoEditPage(storeId, false)}>
                    <Ionicons
                      name="create-outline"
                      size={30}
                      color={'black'}
                      style={{marginLeft: 15}}
                    />
                    <Text style={{color: 'black', marginRight: 0}}>
                      식당 수정
                    </Text>
                  </TouchableOpacity>
                </View>
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
                {address}
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
                거리:{' '}
                {distance !== null ? `${distance.toFixed(2)} km` : '로딩 중...'}
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
              영업 종료 : {closeHour}
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
              {storeNumber}
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
              {storeContent}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            borderColor: 'gray',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            paddingHorizontal: 40,
            paddingVertical: 20,
          }}>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestFoodPage')}>
            <Text
              style={[
                styles.ListText,
                currentPage === 'RestFoodPage' && styles.selectedButtonText,
              ]}>
              메뉴
            </Text>
          </Pressable>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestMapPage')}>
            <Text
              style={[
                styles.ListText,
                currentPage === 'RestMapPage' && styles.selectedButtonText,
              ]}>
              길찾기
            </Text>
          </Pressable>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestReviewPage')}>
            <Text
              style={[
                styles.ListText,
                currentPage === 'RestReviewPage' && styles.selectedButtonText,
              ]}>
              후기
            </Text>
          </Pressable>
          <Pressable
            style={{flex: 1}}
            onPress={() => changePage('RestLivePage')}>
            <Text
              style={[
                styles.ListText,
                currentPage === 'RestLivePage' && styles.selectedButtonText,
              ]}>
              실시간 리뷰
            </Text>
          </Pressable>
        </View>
        <View>
          {currentPage === 'RestFoodPage' && (
            <RestFoodPage storeid={copyStoreId} navigation={navigation} />
          )}
          {currentPage === 'RestMapPage' && (
            <RestMapPage storeid={copyStoreId} />
          )}
          {currentPage === 'RestReviewPage' && (
            <RestReviewPage storeid={copyStoreId} navigation={navigation} />
          )}
          {currentPage === 'RestLivePage' && <RestLivePage />}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ListText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  Scrollstar: {
    color: 'gray',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  selectedButtonText: {
    color: 'black',
  },
});

export default RestPage;
