import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';

import DismissKeyboardView from '../components/DissmissKeyboardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';

const Token = async () => {
  const token = await retrieveToken();
  if (token) {
    console.log('저장된 토큰:', token);
  } else {
    console.log('저장된 토큰을 찾을 수 없습니다.');
  }
};

function AddRestWritePage() {
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
        </View>
        <View>
          <TextInput style={styles.Textinput} placeholder="강남대학교" />
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
        </View>
        <View style={{marginTop: 5}}>
          <View style={styles.ViewFood}>
            <View style={styles.foods}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.image}
              />

              <Text style={styles.FoodsText}>한식</Text>
            </View>
            <View style={styles.foods}>
              <Image
                source={require('../assets/food2.png')}
                style={styles.image}
              />

              <Text style={styles.FoodsText}>중식</Text>
            </View>
            <View style={styles.foods}>
              <Image
                source={require('../assets/food3.png')}
                style={styles.image}
              />

              <Text style={styles.FoodsText}>양식</Text>
            </View>
            <View style={styles.foods}>
              <Image
                source={require('../assets/food4.png')}
                style={styles.image}
              />

              <Text style={styles.FoodsText}>일식</Text>
            </View>
            <View style={styles.foods}>
              <Image
                source={require('../assets/food5.png')}
                style={styles.image}
              />

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
