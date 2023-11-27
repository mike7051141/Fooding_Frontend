import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import axios, {AxiosError} from 'axios';

type SignUpPageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpPage'
>;
function SignUpPage({navigation}: SignUpPageScreenProps) {
  // const toStartPage = useCallback(() => {
  //   navigation.navigate('StartPage');
  // }, [navigation]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [ID, setID] = useState('');
  const [lastID, setLastID] = useState('');
  const [callnumber, setCallNumber] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const nickNameRef = useRef<TextInput | null>(null);
  const IDRef = useRef<TextInput | null>(null);
  const lastIDRef = useRef<TextInput | null>(null);
  const callnumberRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);
  const onChangeNickName = useCallback((text: string) => {
    setNickName(text.trim());
  }, []);
  const onChangeID = useCallback((text: string) => {
    setID(text.trim());
  }, []);
  const onChangeLastID = useCallback((text: string) => {
    setLastID(text.trim());
  }, []);
  const onChangeCallNumber = useCallback((text: string) => {
    setCallNumber(text.trim());
  }, []);

  const onPostregister = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!nickName || !nickName.trim()) {
      return Alert.alert('알림', '닉네임을 입력해주세요.');
    }
    if (!ID || !name.trim()) {
      return Alert.alert('알림', '주민번호을 입력해주세요.');
    }
    if (!lastID) {
      return Alert.alert('알림', '주민번호 뒷자리를 입력해주세요.');
    }
    if (!callnumber || !password.trim()) {
      return Alert.alert('알림', '전화번호를 입력해주세요.');
    }
    // if (
    //   !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
    //     email,
    //   )
    // ) {
    //   return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    // }
    // if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
    //   return Alert.alert(
    //     '알림',
    //     '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
    //   );
    // }
    console.log(email, name, nickName, password, ID, lastID, callnumber);
    try {
      setLoading(true);
      const response = await axios.post(
        `http://kymokim.iptime.org:11080/api/auth/register`,
        {
          email: email,
          name: name,
          password: password,
          nickName: nickName,
          ssNumber: ID + lastID,
          phoneNumber: callnumber,
        },
      );
      console.log(response.data);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('StartPage');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
      if (errorResponse) {
        console.log(errorResponse.data);
      }
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    navigation,
    email,
    name,
    password,
    nickName,
    ID,
    lastID,
    callnumber,
  ]);

  return (
    <DismissKeyboardView style={{backgroundColor: 'white'}}>
      <View
        style={{
          margin: '3%',
        }}>
        <View style={{paddingRight: 7}}>
          <View style={styles.View1}>
            <Icon
              name="mail-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput
              style={styles.TextInPut1}
              placeholder="E-mail"
              value={email}
              ref={emailRef}
              onChangeText={onChangeEmail}
            />
          </View>
          <View style={styles.View1}>
            <Icon
              name="lock-closed-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput
              style={styles.TextInPut1}
              placeholder="비밀번호"
              value={password}
              ref={passwordRef}
              onChangeText={onChangePassword}
            />
          </View>
          <View style={styles.View1}>
            <Icon
              name="checkmark-outline"
              color="black"
              size={30}
              style={styles.Icons}
            />
            <TextInput style={styles.TextInPut1} placeholder="비밀번호 확인" />
          </View>
          <View style={styles.View1}>
            <Icon
              name="mail-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput
              style={styles.TextInPut1}
              placeholder="이름"
              value={name}
              ref={nameRef}
              onChangeText={onChangeName}
            />
          </View>
          <View style={styles.View1}>
            <Icon
              name="person-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput
              style={styles.TextInPut1}
              placeholder="닉네임"
              value={nickName}
              ref={nickNameRef}
              onChangeText={onChangeNickName}
            />
          </View>
          <View style={styles.View1}>
            <Icon
              name="document-lock-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput
              style={styles.TextInPutId}
              placeholder="주민번호 7자리"
              value={ID}
              ref={IDRef}
              onChangeText={onChangeID}
            />
            <Text style={styles.IdText}>-</Text>
            <TextInput
              style={styles.TextInPutIdBack}
              placeholder=""
              value={lastID}
              ref={lastIDRef}
              onChangeText={onChangeLastID}
            />
            <Text
              style={{
                marginTop: 15,
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 30,
                marginRight: 15,
              }}>
              ******
            </Text>
          </View>
          <View style={styles.View1}>
            <Icon
              name="call-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput
              style={styles.TextInPut1}
              placeholder="전화번호"
              value={callnumber}
              ref={callnumberRef}
              onChangeText={onChangeCallNumber}
            />
          </View>
        </View>
        <View style={styles.View2}>
          <Pressable style={styles.StartButton} onPress={onPostregister}>
            <Text style={styles.StartButtonText}>시작하기</Text>
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  View1: {
    flexDirection: 'row',
    marginTop: 5,
  },

  Icons: {
    flex: 1,
    marginLeft: 20,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  TextInPut1: {
    flex: 8,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 11,
  },

  TextInPutId: {
    flex: 3,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 11,
  },
  TextInPutIdBack: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 11,
  },
  IdText: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 10,
  },

  View2: {},
  StartButton: {
    marginTop: 50,
    marginHorizontal: 40,
    backgroundColor: '#B6BE6A',
    paddingHorizontal: 50,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 7,
  },
  StartButtonText: {
    color: 'white',
  },
});

export default SignUpPage;
