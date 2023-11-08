import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

const RestData = [
  {
    name: '땀땀',
    rating: 4.0,
    address: '강남구 강남대로 98길 12-5',
    closingTime: '02:00',
  },
  {
    name: '비어룸',
    rating: 4.0,
    address: '강남구 강남대로 98길 22',
    closingTime: '01:00',
  },
  {
    name: '낙원타코',
    rating: 4.0,
    address: '강남구 강남대로 123길 147',
    closingTime: '12:00',
  },
  {
    name: '경천 CU',
    rating: 5.0,
    address: '용인시 기흥구 구갈동 111',
    closingTime: '24h',
  },
  {
    name: '샬롬 GS25',
    rating: 5.0,
    address: '용인시 기흥구 구갈동 111',
    closingTime: '24h',
  },
  {
    name: '심전 emart24',
    rating: 5.0,
    address: '경기도 용인시 기흥구 상하동 521',
    closingTime: '24h',
  },
];

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'RestPage' | 'AddRestWritePage'
>;

function AddRestPage({navigation}: MainPageScreenProps) {
  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  const toAddRestWritePage = () => {
    navigation.navigate('AddRestWritePage');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="이미 있는 식당은 아닌가요?"
            placeholderTextColor="#B6BE6A"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={30} color="#B6BE6A" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {RestData.map((Rest, index) => (
          <Pressable onPress={toRestPage} key={index}>
            <RestItem
              key={index}
              name={Rest.name}
              rating={Rest.rating}
              address={Rest.address}
              closingTime={Rest.closingTime}
            />
          </Pressable>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={toAddRestWritePage}>
        <Ionicons name="duplicate-outline" size={40} color="#B6BE6A" />
      </TouchableOpacity>
    </View>
  );
}

const RestItem = ({
  name,
  rating,
  address,
  closingTime,
}: {
  name: string;
  rating: number;
  address: string;
  closingTime: string;
}) => {
  const renderStars = (rating: number) => {
    const yellowStars = [];
    const grayStars = [];

    for (let i = 0; i < rating; i++) {
      yellowStars.push(
        <Ionicons
          key={i}
          name="star"
          size={15}
          color="yellow"
          style={styles.Scrollstar}
        />,
      );
    }

    for (let i = rating; i < 5; i++) {
      grayStars.push(
        <Ionicons
          key={i}
          name="star-outline"
          size={15}
          color="gray"
          style={styles.Scrollstar}
        />,
      );
    }

    return (
      <View style={{flexDirection: 'row'}}>
        {yellowStars}
        {grayStars}
      </View>
    );
  };
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: 'lightgray',
        height: 150,
      }}>
      <View style={{marginHorizontal: 20}}>
        <Image source={require('../assets/food1.png')} style={styles.image} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{renderStars(rating)}</Text>
          <Text style={{color: 'black'}}>{rating}</Text>
        </View>
        <View>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>
            {address}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            영업 종료 : {closingTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16,
  },
  searchContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 16,
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#B6BE6A',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  floatingButton: {
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 2,
    borderColor: '#B6BE6A',
    borderRadius: 50,
    elevation: 7, // Android에서 그림자 효과 추가
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default AddRestPage;
