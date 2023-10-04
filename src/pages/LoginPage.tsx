import React, {useCallback, useState} from 'react';
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

type LoginPageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginPage'
>;
function LoginPage({navigation}: LoginPageScreenProps) {
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View style={styles.Fooding}>
        <Image
          source={require('../assets/FoodingLogin.png')} // 이미지 경로 설정
          style={styles.image} // 이미지 스타일 설정
        />
      </View>
      <View style={{flex: 2}}>
        <View style={styles.Email}>
          <TextInput
            placeholder="아이디를 입력하세요"
            placeholderTextColor="black"
            style={styles.TextInPut}></TextInput>
        </View>
        <View style={styles.Password}>
          <TextInput
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor="black"
            style={styles.TextInPut}></TextInput>
        </View>
      </View>
      <View style={styles.buttonZone}>
        <Pressable style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>들어가기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Fooding: {
    flex: 2,
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
  },
  Password: {
    flex: 2,
    paddingHorizontal: 20,
  },
  TextInPut: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  buttonZone: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 4,
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
