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

const LikeRestData = [
  {
    name: '땀땀',
    rating: 4.0,
    address: '강남구 강남대로 98길 12-5',
    closingTime: '02:00',
  },
];
function MapPage() {
  const P0 = {latitude: 37.27566, longitude: 127.13245};

  const [currentLocation, setCurrentLocation] = useState(P0); // 초기 값으로 P0를 설정합니다.

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

    // 3초마다 현재 위치 업데이트
    const updateLocationInterval = setInterval(() => {
      getCurrentLocation();
    }, 3000);

    return () => {
      clearInterval(updateLocationInterval); // 컴포넌트 언마운트 시 타이머 해제
    };
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        style={{flex: 1}}
        showsMyLocationButton={true}
        center={{
          zoom: 11,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          //latitude: (currentLocation.latitude + P0.latitude) / 2,
          //longitude: (currentLocation.longitude + P0.longitude) / 2,
        }} // 중심 위치를 현재 위치로 설정합니다.
      >
        {/* 현재 위치 마커 추가 */}
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          caption="현재 위치"
        />
        <Marker
          coordinate={P0}
          pinColor="red"
          onClick={() => console.warn('강남대!')}
        />
      </NaverMapView>
      <TouchableOpacity
        onPress={() => getCurrentLocation()} // 버튼을 누를 때 현재 위치 업데이트
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>Update Current Location</Text>
      </TouchableOpacity>
      {LikeRestData.map((restaurant, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            bottom: 20,
            left: screenWidth * 0.05,
            width: screenWidth * 0.9,
            height: 'auto',
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#B6BE6A',
            borderRadius: 10,
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
