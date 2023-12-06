import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  TextInput,
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

  // placeholder 표시하기 위한 변수들
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userTel, setUserTel] = useState(''); // 회원가입할 때 백에 전화번호 저장 안 됨 아직
  const [userPassWord, setUserPassWord] = useState('');
  const [imgUri, setImgUri] = useState(null);

  // 사용자 정보 끌어와서 placeholder로 표시
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken(); // 여기에 토큰을 설정합니다.
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/auth/get',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        // get매핑의 response객체에서 각각 필요한 정보 뺀 후 변수에 저장
        const name = response.data.data.name;
        const email = response.data.data.email;
        const nickName = response.data.data.nickName;
        const tel = response.data.data.phoneNumber;
        const userImg = response.data.data.userImg;

        // 데이터 담기
        setUserName(name);
        setUserEmail(email);
        setUserNickName(nickName);
        setUserTel(tel);
        setImgUri(userImg);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {imgUri ? (
          <Image source={{uri: imgUri}} style={styles.profileImage} />
        ) : (
          <Image
            source={require('../assets/profileImage.png')}
            style={styles.profileImage}
          />
        )}
        <View>
          <Text style={styles.username}>{userNickName} 님</Text>
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
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>이름</Text>
          <TextInput style={styles.input} value={userName} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>아이디</Text>
          <TextInput style={styles.input} value={userEmail} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>전화번호</Text>
          <TextInput style={styles.input} value={userTel} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>닉네임</Text>
          <TextInput style={styles.input} value={userNickName} />
        </View>
      </View>
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
    height: 200,
    borderColor: 'gray',
    paddingLeft: 20,
    backgroundColor: 'whitesmoke',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 70,
    marginLeft: 30,
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
  inputContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'black',
    paddingTop: 30,
    // backgroundColor: 'red',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    // backgroundColor: 'red',
    width: 400,
  },
  inputLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 10,
    textAlign: 'center',
    marginTop: 8,
    marginLeft: 25,
    // backgroundColor: 'blue',
  },
  input: {
    color: 'black',
    flex: 3,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    fontSize: 18,
    marginRight: 50,
    // backgroundColor: 'red',
  },
});

export default ProfilePage;
function getToken() {
  throw new Error('Function not implemented.');
}
