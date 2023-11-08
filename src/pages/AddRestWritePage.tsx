import React, {useState} from 'react';
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
} from 'react-native';

import DismissKeyboardView from '../components/DissmissKeyboardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';

import {API_KEY} from '@env';
const Token = async () => {
  const token = await retrieveToken();
  if (token) {
    console.log('저장된 토큰:', token);
  } else {
    console.log('저장된 토큰을 찾을 수 없습니다.');
  }
};

function AddRestWritePage() {
  const [locationInfo, setLocationInfo] = useState<string | null>(null);
  const [addressInput, setAddressInput] = useState<string>(''); // State to store the input address
  const [lat, setLat] = useState<string>(''); //위도
  const [long, setLong] = useState<string>(''); //경도
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
        setLong(lng);
        setLat(lat);
        console.log(info);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  const handleButtonClick = () => {
    geocodeAddress(addressInput, API_KEY);
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

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <DismissKeyboardView>
        <View style={styles.View1}>
          <Ionicons name="storefront-outline" size={25} color={'black'} />
          <Text style={styles.text}>상호명을 입력해 주세요</Text>
        </View>
        <View>
          <TextInput style={styles.Textinput} placeholder="Fooding" />
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
            value={addressInput}
            onChangeText={text => setAddressInput(text)}
            placeholder="강남대학교"
          />
        </View>
        <View style={styles.View1}>
          <Text style={{...styles.text, flex: 1}}>경도: {lat}</Text>
          <Text style={{...styles.text, flex: 1}}>위도: {long}</Text>
        </View>

        <View style={styles.View1}>
          <Ionicons name="time-outline" size={25} color={'black'} />
          <Text style={styles.text}>영업 시작 시간을 입력해 주세요</Text>
        </View>
        <View>
          <TextInput style={styles.Textinput} placeholder="18:00" />
        </View>
        <View style={styles.View1}>
          <Ionicons name="time-outline" size={25} color={'black'} />
          <Text style={styles.text}>영업 종료 시간을 입력해 주세요</Text>
        </View>
        <View>
          <TextInput style={styles.Textinput} placeholder="02:00" />
        </View>
        <View style={styles.View1}>
          <Ionicons name="call-outline" size={25} color={'black'} />
          <Text style={styles.text}>전화번호를 입력해 주세요</Text>
        </View>
        <View>
          <TextInput style={styles.Textinput} placeholder="031-1234-5678" />
        </View>
        <View style={styles.View1}>
          <Ionicons name="list-outline" size={25} color={'black'} />
          <Text style={styles.text}>식당을 간단히 소개해주세요</Text>
        </View>
        <View>
          <TextInput style={styles.Textinput} placeholder="싱싱한 육준서" />
        </View>
        <View style={styles.View1}>
          <Ionicons name="menu-book-outline" size={25} color={'black'} />
          <Text style={styles.text}>어떤 음식을 제공하나요?</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={{color: 'black'}}>{selectedCategory}</Text>
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 5}}>
          {Array.from({length: 2}).map((_, rowIndex) => (
            <View key={rowIndex} style={{flexDirection: 'row'}}>
              {foodCategories
                .slice(rowIndex * 5, (rowIndex + 1) * 5)
                .map((category, index) => (
                  <View
                    style={{
                      flex: 1,
                      borderColor:
                        selectedCategory === category.name
                          ? '#B6BE6A'
                          : 'transparent',
                      borderWidth: selectedCategory === category.name ? 2 : 2,
                      marginBottom: 5,
                    }}
                    key={index}>
                    <TouchableOpacity
                      onPress={() => setSelectedCategory(category.name)}
                      style={styles.foods}>
                      <Image
                        source={category.imageSource}
                        style={styles.image}
                      />
                      <Text style={styles.FoodsText}>{category.name}</Text>
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
        <View></View>
      </DismissKeyboardView>
    </ScrollView>
  );
}

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

export default AddRestWritePage;
