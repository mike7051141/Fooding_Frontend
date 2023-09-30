import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CategoryPage = () => {
  const navigation = useNavigation();

  const photos = [
    {id: 1, source: require('../assets/addrest.png')},
    {id: 2, source: require('../assets/regiauth.png')},
    {id: 3, source: require('../assets/review.png')},
    {id: 4, source: require('../assets/livechat.png')},
  ];

  // 각 이미지를 눌렀을 때 다른 페이지로 이동하는 함수
  const handlePhotoPress = pageName => {
    navigation.navigate(pageName);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.photoContainer}
      onPress={() => handlePhotoPress(item.pageName)} // 페이지 이름을 전달
    >
      <Image source={item.source} style={styles.photo} />
    </TouchableOpacity>
  );

  const dataWithPageNames = [
    {id: 1, source: require('../assets/addrest.png'), pageName: 'AddRestPage'},
    {
      id: 2,
      source: require('../assets/regiauth.png'),
      pageName: 'AuthRegisterPage',
    },
    {
      id: 3,
      source: require('../assets/review.png'),
      pageName: 'WriteReviewPage',
    },
    {
      id: 4,
      source: require('../assets/livechat.png'),
      pageName: 'WriteLiveReviewPage',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={dataWithPageNames} // 페이지 이름을 포함한 데이터를 사용
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6BE6A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    padding: 16,
    marginTop: 150,
  },
  photoContainer: {
    margin: 10,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default CategoryPage;
