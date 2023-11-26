import React, {useEffect, useState} from 'react';
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
import {MainPageStackParamList} from '../components/MainStack';
import {retrieveToken} from '../store/storage';
import axios from 'axios';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'RestPage'
>;

function LikePage({navigation}: MainPageScreenProps) {
  const toRestPage = (storeid: number) => {
    navigation.navigate('RestPage', {storeid: storeid});
  };

  // 검색어 저장하는 변수
  const [searchStore, setSearchStore] = useState('');
  // 서버에서 받아온 식당들을 배열 형태로 저장
  const [searchStoreList, setSearchStoreList] = useState<
    Array<SearchStoreData>
  >([]);

  // searchStoreList에 받아온 배열 형태의 식당들의 멤버 변수들
  interface SearchStoreData {
    name: string;
    storeRate: number;
    address: string;
    closeHour: string;
    storeid: number;
    reviewCount: number;
    imgUrl: string; // 이미지에 대한 정보가 없어서 any로 처리
  }

  // 식당 전체 조회 기능
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken();
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/store/get',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        const data = response.data.data;
        if (data && Array.isArray(data)) {
          setSearchStoreList(
            data.map(storeItem => ({
              name: storeItem.storeName,
              storeRate: storeItem.storeRate,
              address: storeItem.address,
              closeHour: storeItem.closeHour,
              storeid: storeItem.storeId,
              reviewCount: storeItem.reviewCount,
              imgUrl: storeItem.imgUrl,
            })),
          );
        } else {
          console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('식당 조회 실패', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      {searchStoreList.map((store, index) => (
        <Pressable onPress={() => toRestPage(store.storeid)} key={index}>
          <LikeRestItem
            key={index}
            name={store.name}
            storeRate={store.storeRate}
            reviewCount={store.reviewCount}
            address={store.address}
            closingTime={store.closeHour}
            imgUrl={store.imgUrl}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const LikeRestItem = ({
  name,
  address,
  closingTime,
  storeRate,
  imgUrl,
  reviewCount,
}: {
  name: string;
  address: string;
  closingTime: string;
  storeRate: number;
  imgUrl: string;
  reviewCount: number;
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
        <Image source={{uri: imgUrl}} style={styles.image} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="star" size={15} color="yellow" />
          <Text style={{color: 'black'}}>
            {' '}
            {storeRate.toFixed(1)} ({reviewCount}){' '}
          </Text>
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

    borderWidth: 1,
    borderColor: 'lightgray',
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default LikePage;
