import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';

function MapPage() {
  const [searchStoreList, setSearchStoreList] = useState<
    Array<SearchStoreData>
  >([]);
  const [selectedMarker, setSelectedMarker] = useState(0);

  interface SearchStoreData {
    name: string;
    rating: number;
    address: string;
    closeHour: string;
    latitude: number;
    longitude: number;
    storeid: number;
    img: any; // 이미지에 대한 정보가 없어서 any로 처리
  }

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
          setSearchStoreList(
            data.map(storeItem => ({
              name: storeItem.storeName,
              rating: storeItem.totalRate,
              address: storeItem.address,
              closeHour: storeItem.closeHour,
              latitude: parseFloat(storeItem.latitude),
              longitude: parseFloat(storeItem.longitude),
              storeid: storeItem.storeId,
              img: require('../assets/image22.png'), // 식당들 초기 조회 시 출력되는 사진들
            })),
          );
          console.log(data);
        } else {
          console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('식당 조회 실패', error);
      }
    };
    fetchData();
  }, []);

  const mark = searchStoreList.map(store => ({
    storeid: store.storeid,
    latitude: store.latitude,
    longitude: store.longitude,
  }));

  const markInfo = searchStoreList.map(store => ({
    storeid: store.storeid,
    name: store.name,
    rating: store.rating,
    address: store.address,
    closingTime: store.closeHour,
  }));

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

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        style={{flex: 1}}
        showsMyLocationButton={false}
        center={{
          zoom: 15,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }} // 중심 위치를 현재 위치로 설정합니다.
      >
        {/* 현재 위치 마커 추가 */}

        {mark.map((point, index) => {
          return (
            <Marker
              key={point.storeid}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              pinColor="blue"
              onClick={() => {
                // 클릭한 마커의 정보를 선택된 마커로 설정
                setSelectedMarker(point.storeid);
                console.log(point.storeid);
              }}
            />
          );
        })}

        <Marker
          pinColor="green"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          caption="현재 위치"
        />
      </NaverMapView>

      {markInfo.map((restaurant, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            bottom: 10,
            left: screenWidth * 0.02,
            width: screenWidth * 0.96,
            height: 'auto',
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#B6BE6A',
            borderRadius: 10,
            display: selectedMarker === restaurant.storeid ? 'flex' : 'none', // 선택된 마커에만 표시
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',

              borderBottomWidth: 1,
              borderColor: 'lightgray',
              height: 150,
            }}>
            <View style={{marginHorizontal: 10}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.image}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View>
                <Text
                  style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                  {restaurant.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="star-outline"
                  size={15}
                  color="black"
                  style={styles.Scrollstar}
                />
                <Text style={{color: 'black', marginLeft: 5}}>
                  {restaurant.rating} (302)
                </Text>
              </View>
              <View>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>
                  {restaurant.address}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: 10,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  영업 종료 : {restaurant.closingTime}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'black',
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default MapPage;
