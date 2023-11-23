import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, TextInput} from 'react-native';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import RestListPage from './RestListPage';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {MainPageStackParamList} from '../components/MainStack';
import {retrieveToken} from '../store/storage';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {API_KEY} from '@env';

const Stack = createNativeStackNavigator();

const Token = async () => {
  const token = await retrieveToken();
  if (token) {
    console.log('저장된 토큰:', token);
  } else {
    console.log('저장된 토큰을 찾을 수 없습니다.');
  }
};

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'MainPage'
>;

function MainPage({navigation}: MainPageScreenProps): React.JSX.Element {
  const toSearchPage = () => {
    navigation.navigate('SearchPage');
  };

  const toRestListPage = (tabName: string) => {
    navigation.navigate('RestListPage', {screen: tabName});
  };

  interface StoreData {
    storeId: number;
    storeName: string;
    category: string;
    address: string;
    openHour: number;
    closeHour: number;
    totalRate: number;
    reviewCount: number;
    storeLikeCount: number;
    storeRate: number;
    imgUrl: string;
  }
  interface VisitedData {
    storeId: number;
    storeName: string;
    category: string;
    address: string;
    openHour: number;
    closeHour: number;
    totalRate: number;
    reviewCount: number;
    storeLikeCount: number;
    storeRate: number;
    imgUrl: string;
  }
  const [storeData, setStoreData] = useState<Array<StoreData>>([]);
  const [visitedData, setVisitedData] = useState<Array<VisitedData>>([]);

  const [userData, setUserData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken(); // 여기에 토큰을 설정합니다.
        console.log(token);
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/auth/get',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        const data = response.data.data.nickName;
        setUserData(data);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken();
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/store/get',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );

        const data = response.data.data;
        if (data && Array.isArray(data)) {
          // 데이터를 가져와서 필요한 상태 변수를 업데이트합니다.
          setStoreData(data); // 전체 데이터를 상태로 설정
        } else {
          console.error('데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken();
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/store/getRecentStore',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );

        const data = response.data.data;
        if (data && Array.isArray(data)) {
          // 데이터를 가져와서 필요한 상태 변수를 업데이트합니다.
          setVisitedData(data); // 전체 데이터를 상태로 설정
        } else {
          console.error('데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const MyNearPlacesData = storeData.map((storeItem, index) => ({
    name: storeItem.storeName,
    rating: storeItem.totalRate,
    address: storeItem.address,
    storeid: storeItem.storeId,
    storeRate: storeItem.storeRate,
    reviewCount: storeItem.reviewCount,
    imgUrl: storeItem.imgUrl,
  }));
  const VisitedPlacesData = visitedData.map((storeItem, index) => ({
    name: storeItem.storeName,
    rating: storeItem.totalRate,
    address: storeItem.address,
    storeid: storeItem.storeId,
    storeRate: storeItem.storeRate,
    reviewCount: storeItem.reviewCount,
    imgUrl: storeItem.imgUrl,
  }));

  const toRestPage = (storeid: number) => {
    console.log('MainPage에서 넘긴 storeid : ', storeid);
    navigation.navigate('RestPage', {storeid: storeid});
  };
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.27566,
    longitude: 127.13245,
  }); // 초기 값으로 P0를 설정합니다.
  const [myLocation, setMyLocation] = useState('');

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

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  async function reverseGeocode(lat: number, lng: number, apiKey: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ko`,
      );

      if (response.data.status === 'OK') {
        const addressComponents: AddressComponent[] =
          response.data.results[0].address_components;

        // 각 주소 구성 요소의 types 배열을 확인하여 필요한 레벨의 주소를 선택
        const getLongName = (type: string) => {
          const component = addressComponents.find(comp =>
            comp.types.includes(type),
          );
          return component ? component.long_name : '';
        };

        // 원하는 주소 레벨 선택
        const state = getLongName('administrative_area_level_1');
        const city = getLongName('sublocality_level_1');
        const district = getLongName('sublocality_level_2');
        const street = getLongName('sublocality_level_3');
        const sub4 = getLongName('sublocality_level_4');
        const sub5 = getLongName('sublocality_level_5');
        const premise = getLongName('premise');

        // 필요한 정보로 주소 조합
        const components = [
          state,
          city,
          district,
          street,
          sub4,
          sub5,
          premise,
        ].filter(Boolean);

        // 필요한 정보로 주소 조합
        let location = components.join(' ');
        console.log(`위도: ${lat}, 경도: ${lng} - 주소: ${location}`);
        setMyLocation(location);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  useEffect(() => {
    reverseGeocode(
      currentLocation.latitude,
      currentLocation.longitude,
      API_KEY,
    );
  }, [getCurrentLocation]);

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          backgroundColor: '#B6BE6A',
          padding: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'gray'}}>{myLocation}</Text>
        </View>
        <View style={{position: 'absolute', top: 10, right: 10}}>
          <Text style={{color: 'gray'}}>{userData}님 환영합니다</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.LocationText}>내 위치</Text>
        </View>
        <View style={{flex: 3, marginTop: 10}}>
          <Pressable onPress={toSearchPage}>
            <View pointerEvents="none">
              <IconTextInput
                placeholder="오늘은 어디로?"
                iconName="search-outline"
              />
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: 'column',
        }}>
        <View style={styles.ViewFood}>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('KoreaFoodPage')}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>한식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('China')}>
              <Image
                source={require('../assets/food2.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>중식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage1')}>
              <Image
                source={require('../assets/food3.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>양식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage2')}>
              <Image
                source={require('../assets/food4.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>일식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage3')}>
              <Image
                source={require('../assets/food5.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>야식</Text>
          </View>
        </View>
        <View style={styles.ViewFood}>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food6.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>디저트</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food7.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>치킨</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food8.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>피자</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food9.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>분식</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food10.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>패스트푸드</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            margin: 5,
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          내주변 가까운 맛집
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {MyNearPlacesData.map((MyNearPlace, index) => (
            <Pressable
              onPress={() => toRestPage(MyNearPlace.storeid)}
              key={index}>
              <MyNearPlaces
                key={index}
                name={MyNearPlace.name}
                address={MyNearPlace.address}
                img={MyNearPlace.imgUrl}
                storeRate={MyNearPlace.storeRate}
                reviewCount={MyNearPlace.reviewCount}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
          marginBottom: 20,
        }}>
        <Text
          style={{
            margin: 5,
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          최근 방문한 장소
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {VisitedPlacesData.reverse().map((VisitedPlace, index) => (
            <RecentPlaces
              key={index}
              name={VisitedPlace.name}
              storeRate={VisitedPlace.storeRate}
              reviewCount={VisitedPlace.reviewCount}
              address={VisitedPlace.address}
              imgUrl={VisitedPlace.imgUrl}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  LocationText: {
    color: 'white',
    marginLeft: 30,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },

  ViewFood: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  foods: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  FoodsText: {
    color: 'black',
    fontWeight: 'bold',
  },
  imageContainer: {
    margin: 10,
  },
  image: {
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  Scrollimage: {
    width: 150,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  Scrollstar: {
    color: 'gray',
  },
  ScrollText: {},
});

const MyNearPlaces = ({
  name,
  address,
  imgUrl,
  storeRate,
  reviewCount,
}: {
  name: string;
  address: string;
  imgUrl: string;
  storeRate: number;
  reviewCount: number;
}) => {
  return (
    <>
      <View style={{marginLeft: 20}}>
        <Image source={{uri: imgUrl}} style={styles.Scrollimage} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="star" size={15} color="yellow" />
          <Text>
            {' '}
            {storeRate.toFixed(1)} ({reviewCount}){' '}
          </Text>
        </View>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
          {address}
        </Text>
      </View>
    </>
  );
};

const RecentPlaces = ({
  name,
  address,
  imgUrl,
  storeRate,
  reviewCount,
}: {
  name: string;
  address: string;
  imgUrl: string;
  storeRate: number;
  reviewCount: number;
}) => {
  return (
    <>
      <View style={{marginLeft: 20}}>
        <Image source={{uri: imgUrl}} style={styles.Scrollimage} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="star" size={15} color="yellow" />
          <Text>
            {' '}
            {storeRate.toFixed(1)} ({reviewCount}){' '}
          </Text>
        </View>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
          {address}
        </Text>
      </View>
    </>
  );
};

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
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginHorizontal: 30,
      }}>
      <TextInput
        placeholder={placeholder}
        style={{flex: 1, height: 40, color: '#B6BE6A'}}
      />
      <Ionicons name={iconName} size={20} color="#B6BE6A" />
    </View>
  );
};

export default MainPage;
