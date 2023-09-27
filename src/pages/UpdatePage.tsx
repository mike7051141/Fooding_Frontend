import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const UserProfileEdit = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>회원 정보 수정</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.saveButton}>O</Text>
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
        <TextInput placeholder="이름" style={styles.input} />
        <TextInput placeholder="아이디" style={styles.input} />
        <TextInput placeholder="닉네임" style={styles.input} />
        <TextInput placeholder="전화번호" style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
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
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editProfileButton: {
    marginTop: 8,
    color: 'blue',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    fontSize: 18,
  },
});

export default UserProfileEdit;
