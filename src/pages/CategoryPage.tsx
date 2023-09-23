import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const CategoryPage = () => {
  // 가상의 사진 데이터 배열
  const photos = [
    {id: 1, source: require('../assets/addrest.png')},
    {id: 2, source: require('../assets/regiauth.png')},
    {id: 3, source: require('../assets/review.png')},
    {id: 4, source: require('../assets/livechat.png')},
  ];

  // renderItem 함수를 정의하여 각 항목을 그리기
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.photoContainer}>
      <Image source={item.source} style={styles.photo} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // 2열 그리드
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6BE6A',
    alignItems: 'center', // 수평 가운데 정렬
    justifyContent: 'center', // 수직 가운데 정렬
  },
  gridContainer: {
    padding: 16,
    marginTop: 150,
  },

  photo: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10, // 정사각형 모양을 둥글게 만들기 위해 반지름 적용
  },
});

export default CategoryPage;
