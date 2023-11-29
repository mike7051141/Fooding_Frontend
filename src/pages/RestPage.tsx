import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
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

  const deleteStore = async (storeId: number) => {
    Alert.alert(
      '알림',
      '이 식당을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: async () => {
            navigation.goBack();

            try {
              const token = await retrieveToken();
              await axios.delete(
                `http://kymokim.iptime.org:11080/api/store/delete/${storeId}`,
                {
                  headers: {
                    'x-auth-token': token,
                  },
                },
              );
            } catch (e) {
              console.error('식당 삭제 실패', e);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const [currentPage, setCurrentPage] = useState('');
  const [address, setAddress] = useState<string>(''); // State to store the input address
  const [closeHour, setCloseHour] = useState<string>('');
  const [storeNumber, setStoreNumber] = useState<string>('');
  const [storeContent, setStoreContent] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [storeRate, setStoreRate] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>();
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const [line, setLine] = useState(3);
  const [isActivated, setIsActivated] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // 버튼의 상태를 추적하는 새로운 상태
  const [loading, setLoading] = useState(false);

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
        setStoreRate(response.data.data.storeRate);
        setReviewCount(response.data.data.reviewCount);
        setImgUrl(response.data.data.imgUrl);
        setLatitude(response.data.data.latitude);
        setLongitude(response.data.data.longitude);
        setIsLiked(response.data.data.isStoreLiked);
        //console.log(data);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    fetchData();
  }, [storeId]);

  // 좋아요 기능
  const likeStore = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.post(
        `http://kymokim.iptime.org:11080/api/store/like/${storeId}`, // 수정된 부분
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      console.log('좋아요!', response.data);
      Alert.alert('좋아요', '좋아요 성공');
    } catch (error) {
      console.error('사용자 정보 업데이트 실패', error);
    } finally {
      setLoading(false); // 성공하든 실패하든 loading 상태를 false로 설정
    }
  }, [loading, isLiked]);

  // 좋아요 취소 기능
  const cancelStore = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.post(
        `http://kymokim.iptime.org:11080/api/store/unlike/${storeId}`, // 수정된 부분
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      console.log('좋아요취소!', response.data);
      Alert.alert('좋아요취소', '좋아요 취소');
    } catch (error) {
      console.error('사용자 정보 업데이트 실패', error);
    } finally {
      setLoading(false); // 성공하든 실패하든 loading 상태를 false로 설정
    }
  }, [loading, isLiked]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={{uri: imgUrl}}
              style={{width: '100%', aspectRatio: 1.3, resizeMode: 'cover'}}
            />
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
                    width: 60,
                    height: 60,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'} // 상태에 기반하여 아이콘 변경
                    size={25}
                    color={isLiked ? 'red' : 'black'}
                    onPress={() => {
                      setIsLiked(prev => !prev);
                      if (isLiked) {
                        cancelStore();
                      } else {
                        likeStore();
                      }
                    }} // 버튼을 누를 때 상태 토글
                  />
                  <Text style={{color: 'black', marginLeft: 0}}>좋아요</Text>
                </View>

                <View
                  style={{
                    width: 60,
                    height: 60,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => deleteStore(storeId)}>
                    <Ionicons
                      name="trash-outline"
                      size={25}
                      color={'black'}
                      style={{marginLeft: 15}}
                    />
                    <Text style={{color: 'black', marginRight: 0}}>
                      식당 삭제
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: 2,
                  }}>
                  <TouchableOpacity
                    onPress={() => toStoreInfoEditPage(storeId, false)}>
                    <Ionicons
                      name="create-outline"
                      size={25}
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
                {' '}
                {storeRate?.toFixed(1)} ({reviewCount}){' '}
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
                {' '}
                {distance !== null
                  ? distance >= 1
                    ? `${distance.toFixed(2)} km`
                    : `${(distance * 1000).toFixed(0)} m`
                  : '로딩 중...'}
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
              {'  '}
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
