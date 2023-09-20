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

type StartPageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'StartPage'
>;
function StartPage({navigation}: StartPageScreenProps) {
  const toLoginPage = useCallback(() => {
    navigation.navigate('LoginPage');
  }, [navigation]);

  const toSignUpPage = useCallback(() => {
    navigation.navigate('SignUpPage');
  }, [navigation]);

  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#B6BE6A'}}>
      <View style={styles.Fooding}>
        <Image
          source={require('../assets/Fooding.png')} // 이미지 경로 설정
          style={styles.image} // 이미지 스타일 설정
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable onPress={toLoginPage} style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUpPage} style={styles.SignUpButon}>
          <Text style={styles.SignUpButonText}>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Fooding: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: 400,
  },

  buttonZone: {
    flex: 3,
    alignItems: 'center',
  },

  LoginButton: {
    backgroundColor: 'white',
    paddingHorizontal: 130,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
  },
  LoginButtonText: {
    color: '#B6BE6A',
  },

  SignUpButon: {
    backgroundColor: 'white',
    paddingHorizontal: 125,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
  },
  SignUpButonText: {
    color: '#B6BE6A',
  },
});

export default StartPage;
