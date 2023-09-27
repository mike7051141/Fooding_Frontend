import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import NaverMapView from 'react-native-nmap';

function RestMapPage() {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <NaverMapView
        style={{width: '100%', height: '80%'}}
        zoomControl={false}></NaverMapView>
    </View>
  );
}

export default RestMapPage;
