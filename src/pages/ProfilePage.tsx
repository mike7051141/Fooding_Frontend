import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import axios, {AxiosError} from 'axios';
import {retrieveToken, storeToken} from '../store/storage';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'RestPage' | 'UpdatePage'
>;

const ProfilePage = ({navigation}: MainPageScreenProps) => {
  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  const toUpdatePage = () => {
    navigation.navigate('UpdatePage');
  };

  const photosData = [
    {id: 1, image: require('../assets/food1.png')},
    {id: 2, image: require('../assets/food2.png')},
    {id: 3, image: require('../assets/food3.png')},
    {id: 4, image: require('../assets/food4.png')},
    {id: 5, image: require('../assets/food5.png')},
    {id: 6, image: require('../assets/food6.png')},
    {id: 7, image: require('../assets/food7.png')},
    {id: 8, image: require('../assets/food8.png')},
    {id: 9, image: require('../assets/food9.png')},
  ];

  const [loading, setLoading] = useState(false);

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

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../assets/food9.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.username}>{userData}</Text>
          <Pressable onPress={() => toUpdatePage()}>
            <View style={styles.setting}>
              <Text style={{marginRight: 5, fontSize: 15, color: 'gray'}}>
                내 정보 수정
              </Text>
              <Ionicons name="receipt-outline" size={19} color="gray" />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.profileMid}>
        <Text style={styles.profileMidFont}>나만의 맛집</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={photosData}
        numColumns={3}
        horizontal={false}
        renderItem={({item}) => (
          <Pressable onPress={() => toRestPage()} style={styles.frame}>
            <Image source={item.image} style={styles.photo} />
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 150,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    paddingLeft: 20,
    backgroundColor: 'whitesmoke',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 50,
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  setting: {
    flexDirection: 'row',
    width: 110,
    height: 30,
    marginTop: 5,
  },
  profileMid: {
    height: 60,
    borderBottomWidth: 1.2,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  profileMidFont: {
    color: 'black',
    fontSize: 16,
    marginLeft: 30,
    fontWeight: 'bold',
  },
  frame: {
    flex: 1,
    aspectRatio: 1,
    margin: 0.5,
    borderWidth: 0.5,
    padding: 0.5,
    borderColor: 'lightgray',
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default ProfilePage;
function getToken() {
  throw new Error('Function not implemented.');
}
