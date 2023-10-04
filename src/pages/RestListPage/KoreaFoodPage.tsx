import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MainPageStackParamList} from '../../components/MainStack';

const KoreaFoodData = [
  {
    name: '땀땀',
    rating: 4.0,
    address: '강남구 강남대로 98번길 12-5',
    closingTime: '22:00',
    img: require('../../assets/image23.png'),
  },
  {
    name: '장인닭갈비',
    rating: 4.0,
    address: '서강남구 태헤란로1길 19',
    closingTime: '21:30',
    img: require('../../assets/image20.png'),
  },
  // 다른 레스토랑 정보 추가
];

type KoreaFoodPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'KoreaFoodPage'
>;

function KoreaFoodPage({navigation}: KoreaFoodPageScreenProps) {
  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  return (
    <ScrollView
      style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {KoreaFoodData.map((KoreaFood, index) => (
        <Pressable onPress={toRestPage} key={index}>
          <KoreaFoodItem
            key={index}
            name={KoreaFood.name}
            rating={KoreaFood.rating}
            address={KoreaFood.address}
            closingTime={KoreaFood.closingTime}
            img={KoreaFood.img}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const KoreaFoodItem = ({
  name,
  rating,
  address,
  closingTime,
  img,
}: {
  name: string;
  rating: number;
  address: string;
  closingTime: string;
  img: string;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
      }}>
      <View style={{marginHorizontal: 20}}>
        <Image source={img} style={styles.image} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
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
  image: {
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default KoreaFoodPage;
