import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const restaurantData = [
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

function KoreaFoodPage() {
  return (
    <ScrollView
      style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {restaurantData.map((restaurant, index) => (
        <KoreaItem
          key={index}
          name={restaurant.name}
          rating={restaurant.rating}
          address={restaurant.address}
          closingTime={restaurant.closingTime}
        />
      ))}
    </ScrollView>
  );
}

const KoreaItem = ({
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
    <>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: 'lightgray',
        }}>
        <View style={{marginHorizontal: 20}}>
          <Image
            source={require('../../assets/food1.png')}
            style={styles.image}
          />
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
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
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
    </>
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

export default KoreaFoodPage;
