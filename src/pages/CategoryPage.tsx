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
  const navigation = useNavigation(); // navigation 객체 가져오기

  const photos = [
    {id: 1, source: require('../assets/addrest.png')},
    {id: 2, source: require('../assets/regiauth.png')},
    {id: 3, source: require('../assets/review.png')},
    {id: 4, source: require('../assets/livechat.png')},
  ];

  const handlePhotoPress = () => {
    // 이미지 클릭 시 RestPage로 이동
    navigation.navigate('SearchPage');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.photoContainer} onPress={handlePhotoPress}>
      <Image source={item.source} style={styles.photo} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
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
