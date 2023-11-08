import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {retrieveToken, storeToken} from '../store/storage';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'ProfilePage'
>;

const UserProfileEdit = ({navigation}: MainPageScreenProps) => {
  // profilePage로 이동하는 내비게이션 함수
  const toProfilePage = () => {
    navigation.navigate('ProfilePage');
  };

  // placeholder 표시하기 위한 변수들
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userTel, setUserTel] = useState(''); // 회원가입할 때 백에 전화번호 저장 안 됨 아직
  const [userPassWord, setUserPassWord] = useState('');

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
        const password = response.data.data.password;

        // 데이터 담기
        setUserName(name);
        setUserEmail(email);
        setUserNickName(nickName);
        setUserTel(tel);
        setUserPassWord(password);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };

    fetchData();
  }, []);

  // 변경하기 위해 입력한 텍스트들 담는 변수들
  const [loading, setLoading] = useState(false);
  const [newUserTel, setNewUserTel] = useState('');
  const [newUserNickName, setNewUserNickName] = useState('');
  const [newUserPassWord, setNewUserPassWord] = useState('');

  const updateUser = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.put(
        'http://kymokim.iptime.org:11080/api/auth/update',
        {
          name: userName, // 이름은 수정할 필요가 없어서 그냥 기존의 userName값 전달
          nickName: newUserNickName,
          password: newUserPassWord,
          phoneNumber: newUserTel,
          ssNumber: '', // 회원정보수정에서는 SSN을 수정할 필요 없으니 빈 String값 넘김
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      console.log('사용자 정보 업데이트됨:', response.data);
      Alert.alert('알림', '회원 정보 수정 완료');
      toProfilePage();
    } catch (error) {
      console.error('사용자 정보 업데이트 실패', error);
    }
  }, [
    loading,
    navigation,
    userName,
    newUserPassWord,
    newUserNickName,
    newUserTel,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toProfilePage}>
          <Ionicons name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>회원 정보 수정</Text>
        <TouchableOpacity onPress={updateUser}>
          <Ionicons name="checkmark-outline" size={30} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/food1.png')} // 프로필 이미지 경로 설정
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.editProfileButton}>사진 편집</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>이름</Text>
          <TextInput
            //placeholder={userName}
            //value={newUserName}
            //onChangeText={text => setNewUserName(text)}
            style={styles.input}
            value={userName}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>아이디</Text>
          <TextInput
            //placeholder={userName}
            //value={newUserName}
            //onChangeText={text => setNewUserName(text)}
            style={styles.input}
            value={userEmail}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>전화번호</Text>
          <TextInput
            placeholder={userTel}
            style={styles.input}
            value={newUserTel}
            onChangeText={text => setNewUserTel(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>닉네임</Text>
          <TextInput
            placeholder={userNickName}
            style={styles.input}
            value={newUserNickName}
            onChangeText={text => setNewUserNickName(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>비밀번호</Text>
          <TextInput
            placeholder={userPassWord}
            style={styles.input}
            value={newUserPassWord}
            onChangeText={text => setNewUserPassWord(text)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
  },
  saveButton: {
    fontSize: 24,
    color: 'green',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editProfileButton: {
    marginTop: 8,
    color: '#B6BE6A',
    fontWeight: 'bold',
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

export default UserProfileEdit;
