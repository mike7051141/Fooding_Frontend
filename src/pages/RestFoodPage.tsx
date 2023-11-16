import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

interface menuListData {
  menuId: number;
  menuName: string;
  menuContent: string;
  price: number;
  menuLikeCount: number;
  storeId: number;
  navigation: MainPageScreenProps['navigation'];
}

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'AddMenuPage' | 'UpdateMenuPage'
>;

type RestFoodPageProps = {
  storeid: number;
  navigation: MainPageScreenProps['navigation'];
};

function RestFoodPage({storeid, navigation}: RestFoodPageProps) {
  const copyStoreId = storeid;
  const toAddMenuPage = () => {
    navigation.navigate('AddMenuPage', {copyStoreId});
  };

  const [menuList, setMenuList] = useState<Array<menuListData>>([]);

  useEffect(() => {
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
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [storeid, navigation]);

  return (
    <>
      <View style={styles.AddMenuWrapper}>
        <TouchableOpacity style={styles.AddMenu} onPress={toAddMenuPage}>
          <Text style={{color: 'gray', fontSize: 12}}>메뉴 추가</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        {menuList.map((menuItem, index) => (
          <MenuItem
            key={index}
            menuId={menuItem.menuId}
            menuName={menuItem.menuName}
            menuContent={menuItem.menuContent}
            price={menuItem.price}
            navigation={navigation}
          />
        ))}
      </View>
    </>
  );
}

const MenuItem = ({
  //name,
  //explanation,
  //price,
  menuId, // 메뉴 수정할 때 넘길 menuId
  menuName,
  menuContent,
  price,
  navigation,
}: {
  //name: string;
  //explanation: string;
  //price: string;
  menuId: number;
  menuName: string;
  menuContent: string;
  price: number;
  navigation: MainPageScreenProps['navigation'];
}) => {
  const toUpdateMenuPage = () => {
    navigation.navigate('UpdateMenuPage', {menuId});
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
      }}>
      <View style={{marginHorizontal: 10}}>
        <Image source={require('../assets/food1.png')} style={styles.image} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 21, color: 'black', fontWeight: 'bold'}}>
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
          <View style={styles.menuSettings}>
            <TouchableOpacity>
              <Ionicons
                name="heart-outline"
                size={30}
                color={'black'}
                style={{marginRight: 7}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toUpdateMenuPage}>
              <Ionicons
                name="clipboard-outline"
                size={30}
                color={'black'}
                style={{marginLeft: 7}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AddMenuWrapper: {
    backgroundColor: 'white',
    height: 35,
    alignItems: 'center', // 가로 정렬
    justifyContent: 'center', // 세로 정렬
  },
  AddMenu: {
    width: 400,
    height: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#B6BE6A',
    alignItems: 'center', // 가로 정렬
    justifyContent: 'center', // 세로 정렬
    marginRight: 5,
  },
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
  menuSettings: {
    flexDirection: 'row',
  },
});

export default RestFoodPage;
