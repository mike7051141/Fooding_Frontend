import React from 'react';
import {View, Text, Image, StyleSheet, Pressable, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfilePageStackParamList} from '../components/ProfileStack';

type ProfilePageScreenProps = NativeStackScreenProps<
  ProfilePageStackParamList,
  'RestPage' | 'UpdatePage'
>;

const ProfilePage = ({navigation}: ProfilePageScreenProps) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../assets/food9.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.username}>홍길동</Text>
          <Pressable onPress={() => toUpdatePage()}>
            <View style={styles.setting}>
              <Text>내 정보 수정</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.profileMid}>
        <Text style={styles.profileMidFont}>나만의 맛집</Text>
      </View>
      <FlatList
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
    justifyContent: 'center',
    height: 150,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    paddingRight: 130,
    backgroundColor: 'whitesmoke',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  setting: {
    width: 110,
    height: 30,
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
