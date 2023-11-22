import React, {useEffect, useState} from 'react';
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
import {retrieveToken} from '../store/storage';
import axios from 'axios';

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
  'RestPage' | 'AuthRequestPage'
>;

function AuthRegisterPage({navigation}: MainPageScreenProps) {
  const toRestPage = (storeid: number) => {
    navigation.navigate('RestPage', {storeid: storeid});
  };

  const toAuthRequestPage = (storeid: number) => {
    navigation.navigate('AuthRequestPage', {storeid: storeid});
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
    rating: number;
    address: string;
    closeHour: string;
    storeid: number;
    img: any; // 이미지에 대한 정보가 없어서 any로 처리
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
              rating: storeItem.totalRate,
              address: storeItem.address,
              closeHour: storeItem.closeHour,
              storeid: storeItem.storeId,
              img: require('../assets/image22.png'), // 식당들 초기 조회 시 출력되는 사진들
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
  // 식당 이름 검색 기능
  const handleSearchChange = (text: string) => {
    setSearchStore(text);
    console.log('입력한 검색어 : ' + text);

    if (text === '') {
      // 검색어가 빈 string 값일 때 다시 식당 전체 조회 기능
      const researchStoreList = async () => {
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
                rating: storeItem.totalRate,
                address: storeItem.address,
                closeHour: storeItem.closeHour,
                storeid: storeItem.storeId,
                // 검색어를 전부 지웠을 때 출력되는 식당들의 사진들
                img: require('../assets/image22.png'),
              })),
            );
          } else {
            console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
          }
        } catch (error) {
          console.error('식당 조회 실패', error);
        }
      };
      researchStoreList();
    } else {
      // 검색어가 빈 string이 아닐 경우 해당 검색어를 포함한 식당들만 출력
      const filteredStores = searchStoreList.filter(storeItem =>
        storeItem.name.includes(text),
      );
      setSearchStoreList(filteredStores);
    }
  };
  return (
    <>
      {/* 상단바 */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>권한 등록</Text>
        </View>
        <TouchableOpacity style={styles.emptyButton}></TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="어떤 식당을 검색할까요?"
              placeholderTextColor="#B6BE6A"
              value={searchStore}
              onChangeText={handleSearchChange}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search-outline" size={30} color="#B6BE6A" />
            </TouchableOpacity>
          </View>
        </View>
        {/* 식당 정보 출력 컴포넌트 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {searchStoreList.map((store, index) => (
            <Pressable onPress={() => toRestPage(store.storeid)} key={index}>
              <RestItem
                key={index}
                name={store.name}
                storeid={store.storeid}
                rating={store.rating}
                address={store.address}
                closingTime={store.closeHour}
                toAuthRequestPage={toAuthRequestPage}
                img={store.img}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

// 식당 1개에 대한 UI 컴포넌트
const RestItem = ({
  name,
  storeid,
  rating,
  address,
  closingTime,
  toAuthRequestPage,
  img,
}: {
  name: string;
  storeid: number;
  rating: number;
  address: string;
  closingTime: string;
  toAuthRequestPage: (storeid: number) => void;
  img: string;
}) => {
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
      <View style={{flex: 7, flexDirection: 'column'}}>
        <View>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="star" size={15} color="yellow" />
          <Text>{rating}</Text>
        </View>
        <View>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>
            {address}
          </Text>
        </View>
        <View style={{alignItems: 'flex-start', marginTop: 5, marginRight: 10}}>
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
      <TouchableOpacity
        style={styles.autoButton}
        onPress={() => toAuthRequestPage(storeid)}>
        <Ionicons name="id-card-outline" size={70} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  headerTitleContainer: {
    flex: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 'auto', // 중앙 정렬을 위해 marginLeft을 auto로 지정
    color: 'black',
  },
  backButton: {
    flex: 1,
  },
  emptyButton: {
    flex: 1,
  },
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
  image: {
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  Scrollstar: {
    color: 'gray',
  },
  autoButton: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default AuthRegisterPage;
