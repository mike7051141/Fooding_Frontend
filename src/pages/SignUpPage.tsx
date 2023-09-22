import React, {useCallback} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import DismissKeyboardView from '../components/DissmissKeyboardView';

type SignUpPageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpPage'
>;
function SignUpPage({navigation}: SignUpPageScreenProps) {
  const toStartPage = useCallback(() => {
    navigation.navigate('StartPage');
  }, [navigation]);

  return (
    <DismissKeyboardView>
      <View>
        <View>
          <View style={styles.View1}>
            <Icon
              name="mail-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput style={styles.TextInPut1} placeholder="E-mail" />
          </View>
          <View style={styles.View1}>
            <Icon
              name="lock-closed-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput style={styles.TextInPut1} placeholder="비밀번호" />
          </View>
          <View style={styles.View1}>
            <Icon name="" size={30} color="black" style={styles.Icons} />
            <TextInput style={styles.TextInPut1} placeholder="비밀번호 확인" />
          </View>
          <View style={styles.View1}>
            <Icon
              name="mail-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput style={styles.TextInPut1} placeholder="이름" />
          </View>
          <View style={styles.View1}>
            <Icon
              name="person-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput style={styles.TextInPut1} placeholder="닉네임" />
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
            />
            <Text style={styles.IdText}>-</Text>
            <TextInput style={styles.TextInPutIdBack} placeholder="" />
            <Text style={styles.IdText}>******</Text>
          </View>
          <View style={styles.View1}>
            <Icon
              name="call-outline"
              size={30}
              color="black"
              style={styles.Icons}
            />
            <TextInput style={styles.TextInPut1} placeholder="전화번호" />
          </View>
        </View>
        <View style={styles.View2}>
          <Pressable style={styles.StartButton} onPress={toStartPage}>
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
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 5,
  },

  TextInPutId: {
    flex: 4,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 5,
  },
  TextInPutIdBack: {
    padding: 5,
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 5,
  },

  IdText: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },

  View2: {},
  StartButton: {
    marginTop: 200,
    marginHorizontal: 30,
    backgroundColor: '#B6BE6A',
    paddingHorizontal: 50,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 20,
    marginBottom: 10,
  },
  StartButtonText: {
    color: 'white',
  },
});

export default SignUpPage;
