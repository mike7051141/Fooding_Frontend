import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import DismissKeyboardView from '../components/DissmissKeyboardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import {API_KEY} from '@env';
import DatePicker from 'react-native-date-picker';
import {useRoute} from '@react-navigation/native';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'AddRestPage'
>;

const StoreInfoEditPage = ({route, navigation}: MainPageScreenProps) => {
  const toAddRestWritePage = () => {
    navigation.navigate('AddRestPage');
  };

  const [loading, setLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState<string | null>(null);

  const [address, setAddress] = useState<string>(''); // State to store the input address
  const [lat, setLatitude] = useState<string>(''); //위도
  const [lng, setLongitude] = useState<string>(''); //경도
  const [category, setCategory] = useState<string | null>(null);
  const [closeHour, setCloseHour] = useState<string>('');
  const [openHour, setOpenHour] = useState<string>('');
  const [storeContent, setStoreContent] = useState<string>('');
  const [storeName, setStoreName] = useState<string>('');
  const [storeNumber, setStoreNumber] = useState<string>('');
  const [storeId, setStoreId] = useState<number>();
  const [openDate, setOpenDate] = useState(new Date('2023-11-12T00:00:00'));
  const [closeDate, setCloseDate] = useState(new Date('2023-11-12T00:00:00'));
  const [openConfirm, setOpenConfirm] = useState(false);
  const [closeConfirm, setCloseConfirm] = useState(false);

  const selectedOpenTime = openDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const selectedCloseTime = closeDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  useEffect(() => {
    setCloseHour(selectedCloseTime);
  }, [selectedCloseTime]);
  useEffect(() => {
    setOpenHour(selectedOpenTime);
  }, [selectedOpenTime]);

  useEffect(() => {
    // route.params가 없거나 resetState 속성이 없을 경우에 대한 예외 처리
    if (route.params && 'resetState' in route.params) {
      // 초기화할 상태들을 여기에 추가
      setAddress('');
      setLatitude('');
      setLongitude('');
      setCategory(null);
      setStoreContent('');
      setStoreName('');
      setStoreNumber('');
      setOpenDate(new Date('2023-11-12T00:00:00'));
      setCloseDate(new Date('2023-11-12T00:00:00'));
      setOpenConfirm(false);
      setCloseConfirm(false);

      // 기타 초기화 로직 추가 가능
    }
  }, [route.params]);
  const route2 = useRoute();
  const getstoreId = route2.params.storeid;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken(); // 여기에 토큰을 설정합니다.
        //console.log(token);
        console.log(getstoreId);
        setStoreId(getstoreId);
        const response = await axios.get(
          `http://kymokim.iptime.org:11080/api/store/get/${getstoreId}`,
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        setStoreName(response.data.data.storeName);
        setAddress(response.data.data.address);
        setLatitude(response.data.data.latitude);
        setLongitude(response.data.data.longitude);
        setCategory(response.data.data.category);
        setStoreContent(response.data.data.storeContent);
        setStoreNumber(response.data.data.storeNumber);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    fetchData();
  }, [route.params.storeid]);

  async function geocodeAddress(address: string, apiKey: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
      );

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        const {lat, lng} = location;
        const info = `주소: ${address} - 위도: ${lat}, 경도: ${lng}`;
        setLocationInfo(info);
        setLongitude(lat);
        setLatitude(lng);
        console.log(info);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  const handleButtonClick = () => {
    geocodeAddress(address, API_KEY);
  };

  const foodCategories = [
    {name: '한식', imageSource: require('../assets/food1.png')},
    {name: '중식', imageSource: require('../assets/food2.png')},
    {name: '양식', imageSource: require('../assets/food3.png')},
    {name: '일식', imageSource: require('../assets/food4.png')},
    {name: '야식', imageSource: require('../assets/food5.png')},
    {name: '디저트', imageSource: require('../assets/food6.png')},
    {name: '치킨', imageSource: require('../assets/food7.png')},
    {name: '피자', imageSource: require('../assets/food8.png')},
    {name: '분식', imageSource: require('../assets/food9.png')},
    {name: '패스트푸드', imageSource: require('../assets/food10.png')},
  ];

  const updateStore = useCallback(async () => {
    if (loading) {
      return;
    }
    // Check if any of the required values are empty
    if (
      !address ||
      !category ||
      !closeHour ||
      !lat ||
      !lng ||
      !openHour ||
      !storeContent ||
      !storeName ||
      !storeNumber
    ) {
      Alert.alert('알림', '모든 필수 정보를 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.put(
        'http://kymokim.iptime.org:11080/api/store/update',
        {
          address,
          category,
          closeHour: selectedCloseTime,
          latitude: lat,
          longitude: lng,
          openHour: selectedOpenTime,
          storeContent,
          storeId,
          storeName,
          storeNumber,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      console.log('식당 정보 수정:', response.data);
      Alert.alert('알림', '식당 정보 수정');
      toAddRestWritePage();
    } catch (error) {
      console.error('사용자 정보 업데이트 실패', error);
    }
  }, [
    loading,
    navigation,
    address,
    category,
    closeHour,
    lat,
    lng,
    openHour,
    storeContent,
    storeId,
    storeName,
    storeNumber,
  ]);

  useEffect(() => {
    setLoading(false);
  }, [selectedCloseTime]);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <DismissKeyboardView>
        <View style={styles.View1}>
          <Ionicons name="storefront-outline" size={25} color={'black'} />
          <Text style={styles.text}>상호명을 입력해 주세요</Text>
        </View>
        <View>
          <TextInput
            style={styles.Textinput}
            value={storeName}
            onChangeText={text => setStoreName(text)}
            placeholder="Fooding"
          />
        </View>
        <View style={styles.View1}>
          <Ionicons name="map-outline" size={25} color={'black'} />
          <Text style={styles.text}>주소를 입력해 주세요</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Button
              title="주소 확인"
              onPress={handleButtonClick}
              color="#B6BE6A" // 버튼 색상
            />
          </View>
        </View>
        <View>
          <TextInput
            style={styles.Textinput}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="강남대학교"
          />
        </View>
        <View style={styles.View1}>
          <Text style={{...styles.text, flex: 1}}>경도: {lat}</Text>
          <Text style={{...styles.text, flex: 1}}>위도: {lng}</Text>
        </View>

        <View style={styles.View1}>
          <Ionicons name="time-outline" size={25} color={'black'} />
          <Text style={styles.text}>영업 시작 시간을 입력해 주세요</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setOpenConfirm(true)}>
            <TextInput
              pointerEvents="none"
              style={styles.Textinput}
              underlineColorAndroid="transparent"
              editable={false}
              value={selectedOpenTime}
              onChangeText={text => setOpenHour(text)}
            />
            <DatePicker
              mode="time"
              modal
              open={openConfirm}
              date={openDate}
              onConfirm={date => {
                setOpenConfirm(false);
                setOpenDate(date);
              }}
              onCancel={() => {
                setOpenConfirm(false);
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.View1}>
          <Ionicons name="time-outline" size={25} color={'black'} />
          <Text style={styles.text}>영업 종료 시간을 입력해 주세요</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setCloseConfirm(true)}>
            <TextInput
              pointerEvents="none"
              style={styles.Textinput}
              underlineColorAndroid="transparent"
              editable={false}
              value={selectedCloseTime}
            />
            <DatePicker
              mode="time"
              modal
              open={closeConfirm}
              date={closeDate}
              onConfirm={date => {
                setCloseConfirm(false);
                setCloseDate(date);
              }}
              onCancel={() => {
                setCloseConfirm(false);
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.View1}>
          <Ionicons name="call-outline" size={25} color={'black'} />
          <Text style={styles.text}>전화번호를 입력해 주세요</Text>
        </View>
        <View>
          <TextInput
            style={styles.Textinput}
            value={storeNumber}
            onChangeText={text => setStoreNumber(text)}
            placeholder="031-1234-5678"
          />
        </View>
        <View style={styles.View1}>
          <Ionicons name="list-outline" size={25} color={'black'} />
          <Text style={styles.text}>식당을 간단히 소개해주세요</Text>
        </View>
        <View>
          <TextInput
            style={styles.Textinput}
            value={storeContent}
            onChangeText={text => {
              setStoreContent(text);
            }}
            placeholder="싱싱한 육준서"
          />
        </View>
        <View style={styles.View1}>
          <Ionicons name="menu-book-outline" size={25} color={'black'} />
          <Text style={styles.text}>어떤 음식을 제공하나요?</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={{color: 'black'}}>{category}</Text>
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 5}}>
          {Array.from({length: 2}).map((_, rowIndex) => (
            <View key={rowIndex} style={{flexDirection: 'row'}}>
              {foodCategories
                .slice(rowIndex * 5, (rowIndex + 1) * 5)
                .map((Category, index) => (
                  <View
                    style={{
                      flex: 1,
                      borderColor:
                        category === Category.name ? '#B6BE6A' : 'transparent',
                      borderWidth: category === Category.name ? 2 : 2,
                      marginBottom: 5,
                    }}
                    key={index}>
                    <TouchableOpacity
                      onPress={() => setCategory(Category.name)}
                      style={styles.foods}>
                      <Image
                        source={Category.imageSource}
                        style={styles.image}
                      />
                      <Text style={styles.FoodsText}>{Category.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          ))}
        </View>

        <View style={styles.View1}>
          <Ionicons name="camera-outline" size={25} color={'black'} />
          <Text style={styles.text}>사진을 추가해 주세요</Text>
        </View>
        <View></View>
        <View>
          <Text style={styles.text}>이제 메뉴를 추가해볼까요?</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: 20,
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
            onPress={updateStore}>
            <Text style={{color: 'white', fontSize: 16}}>수정</Text>
          </TouchableOpacity>
        </View>
      </DismissKeyboardView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  View1: {
    flexDirection: 'row',
    marginTop: '3%',
    alignItems: 'center',
    marginHorizontal: '10%',
  },

  text: {
    marginLeft: 20,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },

  Textinput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginVertical: '3%',
    marginHorizontal: '10%',
    paddingLeft: 20,
    color: 'black',
  },

  foods: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ViewFood: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: '2%',
    marginHorizontal: '10%',
  },

  image: {
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  FoodsText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default StoreInfoEditPage;
