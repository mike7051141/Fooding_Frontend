import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import axios, {AxiosError} from 'axios';
import {storeToken} from '../store/storage';

type LoginPageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginPage'
> & {onLoginSuccess: () => void};

function LoginPage({navigation, onLoginSuccess}: LoginPageScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onPostLogin = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }

    console.log(email, password);
    try {
      setLoading(true);
      const response = await axios.post(
        `http://kymokim.iptime.org:11080/api/auth/login`,
        {
          email,
          password,
        },
      );
      await storeToken(response.data.data.accessToken);
      Alert.alert('알림', '로그인 되었습니다.');
      onLoginSuccess();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
      if (errorResponse) {
        console.log(errorResponse.data);
        Alert.alert('알림', '아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [loading, navigation, email, password]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.Fooding}>
        <Image
          source={require('../assets/FoodingLogin.png')} // 이미지 경로 설정
          style={styles.image} // 이미지 스타일 설정
        />
      </View>
      <View
        style={{
          flex: 2,
        }}>
        <View style={styles.Email}>
          <TextInput
            placeholder="이메일을 입력하세요"
            placeholderTextColor="black"
            value={email}
            ref={emailRef}
            onChangeText={onChangeEmail}
            style={styles.TextInPut}></TextInput>
        </View>
        <View style={styles.Password}>
          <TextInput
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor="black"
            value={password}
            ref={passwordRef}
            onChangeText={onChangePassword}
            secureTextEntry={true} // Set secureTextEntry to true
            style={styles.TextInPut}></TextInput>
        </View>
      </View>
      <View style={styles.buttonZone}>
        <Pressable style={styles.LoginButton} onPress={onPostLogin}>
          <Text style={styles.LoginButtonText}>로그인</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  Fooding: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: 150,
  },

  Email: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  Password: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  TextInPut: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 5,
  },
  buttonZone: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 3,
    marginBottom: 20,
  },
  LoginButton: {
    backgroundColor: '#B6BE6A',
    paddingHorizontal: 110,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  LoginButtonActive: {
    backgroundColor: 'blue',
  },
  LoginButtonText: {
    color: 'white',
  },
});

export default LoginPage;
function setLoggedIn(arg0: boolean) {
  throw new Error('Function not implemented.');
}
