import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Dimensions, Alert} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import TMap from '../modules/TMap';

function RestMapPage() {
  const P0 = {latitude: 37.2524629, longitude: 127.1206963};
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
  }, []);
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 300,
      }}>
      <NaverMapView
        style={{flex: 1}}
        showsMyLocationButton={true}
        center={{
          zoom: 15,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          //latitude: (currentLocation.latitude + P0.latitude) / 2,
          //longitude: (currentLocation.longitude + P0.longitude) / 2,
        }} // 중심 위치를 현재 위치로 설정합니다.
      >
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
          onClick={() => {
            TMap.openNavi(
              '도착지',
              P0.longitude.toString(),
              P0.latitude.toString(),
              'MOTORCYCLE',
            ).then(data => {
              console.log('TMap callback', data);
              if (!data) {
                Alert.alert('알림', '티맵을 설치하세요.');
              }
            });
          }}
        />
      </NaverMapView>
    </View>
  );
}

export default RestMapPage;
