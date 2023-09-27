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
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  const [currentLocation, setCurrentLocation] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        setForceUpdate(!forceUpdate); // 상태 업데이트로 인한 강제 리렌더링
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
    <View style={{flex: 1}}>
      <NaverMapView
        style={{flex: 1}}
        showsMyLocationButton={true}
        center={currentLocation || P0}>
        <Marker coordinate={P0} />
        <Marker coordinate={P1} pinColor="blue" />
        <Marker coordinate={P2} pinColor="red" />
        <Path coordinates={[P0, P1]} width={10} />
        <Polyline coordinates={[P1, P2]} />
        <Circle coordinate={P0} color={'rgba(255,0,0,0.3)'} radius={200} />
        <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} />
      </NaverMapView>
      <TouchableOpacity
        onPress={getCurrentLocation}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundColor: 'cyan',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>짜증나</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MapPage;
