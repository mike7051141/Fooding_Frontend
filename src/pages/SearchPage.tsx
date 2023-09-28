import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

const SearchData = [
  {
    name: '레스토랑 1',
    rating: 4.5,
    address: '주소 1',
    closingTime: '22:00',
  },
  {
    name: '레스토랑 2',
    rating: 3.8,
    address: '주소 2',
    closingTime: '21:30',
  },
  // 다른 레스토랑 정보 추가
];

type SearchPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'SearchPage'
>;

function SearchPage({navigation}: SearchPageScreenProps) {
  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  return (
    <ScrollView
      style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {SearchData.map((KoreaFood, index) => (
        <Pressable onPress={toRestPage} key={index}>
          <SearchItem
            key={index}
            name={KoreaFood.name}
            rating={KoreaFood.rating}
            address={KoreaFood.address}
            closingTime={KoreaFood.closingTime}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const SearchItem = ({
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
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
      }}>
      <View style={{marginHorizontal: 10}}>
        <Image source={require('../assets/food1.png')} style={styles.image} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 23, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Ionicons
            name="star-outline"
            size={15}
            color="black"
            style={styles.Scrollstar}
          />
          <Ionicons
            name="star-outline"
            size={15}
            color="black"
            style={styles.Scrollstar}
          />
          <Ionicons
            name="star-outline"
            size={15}
            color="black"
            style={styles.Scrollstar}
          />
          <Ionicons
            name="star-outline"
            size={15}
            color="black"
            style={styles.Scrollstar}
          />
          <Ionicons
            name="star-outline"
            size={15}
            color="black"
            style={styles.Scrollstar}
          />
          <Text style={{color: 'black', marginLeft: 5}}>{rating} (302)</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginRight: 10,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>
            {address}
          </Text>
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
  image: {
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default SearchPage;
