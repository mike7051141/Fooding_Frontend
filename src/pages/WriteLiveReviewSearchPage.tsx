import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, Button, TextInput} from 'react-native';

function WriteLiveReviewSearchPage() {
  const [locationInfo, setLocationInfo] = useState<string | null>(null);
  const [addressInput, setAddressInput] = useState<string>(''); // State to store the input address

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
        console.log(info);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  const handleButtonClick = () => {
    geocodeAddress(addressInput, 'AIzaSyDyBGU-R--ZVG6ktDZgZuXLSYID6NFamiE');
  };

  return (
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 10,
        }}
        value={addressInput}
        onChangeText={text => setAddressInput(text)}
        placeholder="주소 입력 예: 서울대 입구"
      />
      <Button title="Get Location Info" onPress={handleButtonClick} />
      {locationInfo && <Text>{locationInfo}</Text>}
    </View>
  );
}

export default WriteLiveReviewSearchPage;
