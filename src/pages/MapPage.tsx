import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

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
          bottom: 20,
          right: 20,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>Update Current Location</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MapPage;
