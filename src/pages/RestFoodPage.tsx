import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

const RestFoodsData = [
  {
    name: '1번 음식',
    explanation: 'good',
    price: '10,000',
  },
  {
    name: '2번 음식',
    explanation: 'amazing',
    price: '20,000',
  },
  {
    name: '3번 음식',
    explanation: 'hmm...',
    price: '30,000',
  },
];

interface menuListData {
  menuId: number;
  menuName: string;
  menuContent: string;
  price: number;
  menuLikeCount: number;
  storeId: number;
}

type MainPageScreenProps = NativeStackScreenProps<MainPageStackParamList>;

function RestFoodPage({
  storeId,
  navigation,
}: {
  storeId: number;
  navigation: MainPageScreenProps;
}) {
  const [menuList, setMenuList] = useState<Array<menuListData>>([]);

  useEffect(() => {
    console.log('받아온 가게 id: ', storeId);

    const fetchData = async () => {
      try {
        const token = await retrieveToken();
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/menu/get',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        const data = response.data.data;
        if (data && Array.isArray(data)) {
          const filteredMenu = data.filter(menu => menu.storeId === storeId);
          setMenuList(
            filteredMenu.map(menuItem => ({
              menuId: menuItem.menuId,
              menuName: menuItem.menuName,
              menuContent: menuItem.menuContent,
              price: menuItem.price,
              menuLikeCount: menuItem.menuLikeCount,
              storeId: menuItem.storeId,
            })),
          );
        } else {
          console.error('메뉴에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('메뉴 조회 실패', error);
      }
    };
    fetchData();
  }, [storeId, navigation]);

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {menuList.map((menuItem, index) => (
        <MenuItem
          key={index}
          menuName={menuItem.menuName}
          menuContent={menuItem.menuContent}
          price={menuItem.price}
        />
      ))}
    </View>
  );
}

const MenuItem = ({
  //name,
  //explanation,
  //price,
  menuName,
  menuContent,
  price,
}: {
  //name: string;
  //explanation: string;
  //price: string;
  menuName: string;
  menuContent: string;
  price: number;
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
            {menuName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, marginTop: 5}}>
          <Text style={{color: 'black', marginLeft: 0, fontSize: 15}}>
            메뉴 소개 : {menuContent}
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
  floatingButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#B6BE6A',
    padding: 1,
    borderWidth: 2,
    borderColor: '#B6BE6A',
    borderRadius: 50,
    elevation: 7, // Android에서 그림자 효과 추가
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RestFoodPage;
