import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestFoodsData = [
  {
    name: '레스토랑 1',
    explanation: '음식 설명',
    price: '10,000',
  },
  {
    name: '레스토랑 2',
    explanation: '음식 설명',
    price: '20,000',
  },
  // 다른 레스토랑 정보 추가
];

function RestFoodPage() {
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {RestFoodsData.map((KoreaFood, index) => (
        <RestFoodsItem
          key={index}
          name={KoreaFood.name}
          explanation={KoreaFood.explanation}
          price={KoreaFood.price}
        />
      ))}
    </View>
  );
}

const RestFoodsItem = ({
  name,
  explanation,
  price,
}: {
  name: string;
  explanation: string;
  price: string;
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
      <View style={{marginHorizontal: 10}}>
        <Image source={require('../assets/food1.png')} style={styles.image} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 23, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, marginTop: 5}}>
          <Text style={{color: 'black', marginLeft: 5, fontSize: 15}}>
            {explanation}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginRight: 10,
          }}>
          <Text style={{color: 'red', fontSize: 18}}>{price} 원</Text>
          <Ionicons
            name="heart-outline"
            size={30}
            color={'black'}
            style={{marginRight: 15}}
          />
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

export default RestFoodPage;
