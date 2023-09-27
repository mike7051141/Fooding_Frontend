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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LikePageStackParamList} from '../components/LikeStack';

const LikeRestData = [
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

type LikePageScreenProps = NativeStackScreenProps<
  LikePageStackParamList,
  'RestPage'
>;

function LikePage({navigation}: LikePageScreenProps) {
  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {LikeRestData.map((LikeRest, index) => (
        <Pressable onPress={toRestPage} key={index}>
          <LikeRestItem
            key={index}
            name={LikeRest.name}
            rating={LikeRest.rating}
            address={LikeRest.address}
            closingTime={LikeRest.closingTime}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const LikeRestItem = ({
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
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
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default LikePage;
