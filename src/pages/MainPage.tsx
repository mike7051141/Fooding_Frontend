import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, TextInput} from 'react-native';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import RestListPage from './RestListPage';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {MainPageStackParamList} from '../components/MainStack';
import {retrieveToken} from '../store/storage';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const Token = async () => {
  const token = await retrieveToken();
  if (token) {
    console.log('저장된 토큰:', token);
  } else {
    console.log('저장된 토큰을 찾을 수 없습니다.');
  }
};

const RecentPlacesData = [
  {
    name: '장안닭갈비',
    rating: 4.0,
    address: '서강남구 태헤란로1길 19',
    img: require('../assets/image20.png'),
  },
  {
    name: '육하망칙',
    rating: 3.0,
    address: '강남구 강남대로 100길 13 3층',
    img: require('../assets/image21.png'),
  },
  {
    name: '구구당',
    rating: 4.0,
    address: '강남구 강남대로 100길 13 3층',
    img: require('../assets/image22.png'),
  },
];

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'MainPage'
>;

function MainPage({navigation}: MainPageScreenProps): React.JSX.Element {
  const toSearchPage = () => {
    navigation.navigate('SearchPage');
  };

  const toRestListPage = (tabName: string) => {
    navigation.navigate('RestListPage', {screen: tabName});
  };

  interface StoreData {
    storeId: number;
    storeName: string;
    category: string;
    address: string;
    openHour: number;
    closeHour: number;
    totalRate: number;
    reviewCount: number;
    storeLikeCount: number;
  }

  const [storeData, setStoreData] = useState<Array<StoreData>>([]);
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');

  const [userData, setUserData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken(); // 여기에 토큰을 설정합니다.
        console.log(token);
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/auth/get',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        const data = response.data.data.nickName;
        setUserData(data);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

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
          // 데이터를 가져와서 필요한 상태 변수를 업데이트합니다.
          setStoreData(data); // 전체 데이터를 상태로 설정
        } else {
          console.error('데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const MyNearPlacesData = storeData.map((storeItem, index) => ({
    name: storeItem.storeName,
    rating: storeItem.totalRate,
    address: storeItem.address,
    storeid: storeItem.storeId,
    img: require('../assets/Fooding.png'),
  }));

  const toRestPage = (storeid: number) => {
    console.log('MainPage에서 넘긴 storeid : ', storeid);
    navigation.navigate('RestPage', {storeid: storeid});
  };

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          backgroundColor: '#B6BE6A',
          padding: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'gray'}}>지금 내 위치는</Text>
        </View>
        <View style={{position: 'absolute', top: 10, right: 10}}>
          <Text style={{color: 'gray'}}>{userData}님 환영합니다</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.LocationText}>내 위치</Text>
        </View>
        <View style={{flex: 3, marginTop: 10}}>
          <Pressable onPress={toSearchPage}>
            <View pointerEvents="none">
              <IconTextInput
                placeholder="오늘은 어디로?"
                iconName="search-outline"
              />
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: 'column',
        }}>
        <View style={styles.ViewFood}>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('KoreaFoodPage')}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>한식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('China')}>
              <Image
                source={require('../assets/food2.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>중식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage1')}>
              <Image
                source={require('../assets/food3.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>양식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage2')}>
              <Image
                source={require('../assets/food4.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>일식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage3')}>
              <Image
                source={require('../assets/food5.png')}
                style={styles.image}
              />
            </Pressable>
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
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            margin: 5,
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          내주변 가까운 맛집
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {MyNearPlacesData.map((MyNearPlace, index) => (
            <Pressable
              onPress={() => toRestPage(MyNearPlace.storeid)}
              key={index}>
              <MyNearPlaces
                key={index}
                name={MyNearPlace.name}
                rating={MyNearPlace.rating}
                address={MyNearPlace.address}
                img={MyNearPlace.img}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
          marginBottom: 20,
        }}>
        <Text
          style={{
            margin: 5,
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          최근 방문한 장소
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {RecentPlacesData.map((RecentPlace, index) => (
            <RecentPlaces
              key={index}
              name={RecentPlace.name}
              rating={4}
              address={RecentPlace.address}
              img={RecentPlace.img}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  LocationText: {
    color: 'white',
    marginLeft: 30,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },

  ViewFood: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  foods: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  FoodsText: {
    color: 'black',
    fontWeight: 'bold',
  },

  imageContainer: {
    margin: 10,
  },
  image: {
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
  },

  Scrollimage: {
    width: 150,
    height: 70,
    borderRadius: 10,
  },
  Scrollstar: {
    color: 'gray',
  },
  ScrollText: {},
});

const MyNearPlaces = ({
  name,
  rating,
  address,
  img,
}: {
  name: string;
  rating: number;
  address: string;
  img: string;
}) => {
  return (
    <>
      <View style={{marginLeft: 20}}>
        <Image source={img} style={styles.Scrollimage} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="star" size={15} color="yellow" />
          <Text>{rating}</Text>
        </View>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
          {address}
        </Text>
      </View>
    </>
  );
};

const RecentPlaces = ({
  name,
  rating,
  address,
  img,
}: {
  name: string;
  rating: number;
  address: string;
  img: string;
}) => {
  return (
    <>
      <View style={{marginLeft: 20}}>
        <Image source={img} style={styles.Scrollimage} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="star" size={15} color="yellow" />
          <Text> {rating}</Text>
        </View>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
          {address}
        </Text>
      </View>
    </>
  );
};

interface IconTextInputProps {
  iconName: string; // iconName 프로퍼티의 타입을 string으로 명시적으로 지정
  placeholder: string;
}

const IconTextInput: React.FC<IconTextInputProps> = ({
  iconName,
  placeholder,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginHorizontal: 30,
      }}>
      <TextInput
        placeholder={placeholder}
        style={{flex: 1, height: 40, color: '#B6BE6A'}}
      />
      <Ionicons name={iconName} size={20} color="#B6BE6A" />
    </View>
  );
};

export default MainPage;
