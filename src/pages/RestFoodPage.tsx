import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';

interface menuListData {
  menuId: number;
  menuName: string;
  menuContent: string;
  price: number;
  menuLikeCount: number;
  storeId: number;
}

function RestFoodPage({storeid}: {storeid: number}) {
  const [menuList, setMenuList] = useState<Array<menuListData>>([]);

  useEffect(() => {
    console.log('RestFoodPage에서 받은 storeid : ', storeid);
    const fetchData = async () => {
      try {
        const token = await retrieveToken();
        const response = await axios.get(
          `http://kymokim.iptime.org:11080/api/store/get/${storeid}`,
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        const data = response.data.data;
        if (data && data.menuList && Array.isArray(data.menuList)) {
          setMenuList(data.menuList);
        } else {
          console.error('메뉴에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
        // 이 부분에 어떤 코드를 추가해야할지 모르겠네
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    fetchData();
  }, [storeid]);

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
        <View style={{flexDirection: 'row', flex: 1, marginTop: 7}}>
          <Text style={{color: 'black', marginLeft: 2, fontSize: 15}}>
            {menuContent}
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
