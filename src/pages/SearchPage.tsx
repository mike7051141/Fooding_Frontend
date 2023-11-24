import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import {retrieveToken} from '../store/storage';
import axios from 'axios';

type SearchPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'SearchPage' | 'RestFoodPage'
>;

function SearchPage({navigation}: SearchPageScreenProps) {
  const toRestPage = (storeid: number) => {
    console.log('SearchPage에서 넘긴 storeid : ', storeid);
    navigation.navigate('RestPage', {storeid: storeid});
  };

  // searchStoreList에 받아온 배열 형태의 식당들의 멤버 변수들
  interface SearchStoreData {
    name: string;
    rating: number;
    address: string;
    closeHour: string;
    storeid: number;
    storeRate: number;
    img: any; // 이미지에 대한 정보가 없어서 any로 처리
  }

  // 서버에서 받아온 식당들을 배열 형태로 저장
  const [searchStoreList, setSearchStoreList] = useState<
    Array<SearchStoreData>
  >([]);

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
              storeid: storeItem.storeId.toString(),
              storeRate: storeItem.storeRate,
              img: require('../assets/FoodingLogin.png'), // 식당들 초기 조회 시 출력되는 사진들
            })),
          );
        } else {
          console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('식당 조회 실패', error);
      }
    };

    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  // 검색어 저장하는 변수
  const [searchStore, setSearchStore] = useState('');

  // 식당 이름 검색 기능
  const handleSearchChange = (text: string) => {
    setSearchStore(text);

    if (text === '') {
      // 검색어가 빈 string 값일 때 다시 식당 전체 조회 기능
      const researchStoreList = async () => {
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
              storeRate: storeItem.storeRate,
              img: require('../assets/image22.png'), // 검색어를 전부 지웠을 때 출력되는 식당들의 사진들
            })),
          );
        } else {
          console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
      };
      researchStoreList();
    } else {
      // 검색어가 빈 string이 아닐 경우 해당 검색어를 포함한 식당들만 출력
      const filteredStores = searchStoreList.filter(storeItem =>
        storeItem.name.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchStoreList(filteredStores);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={30} color="#B6BE6A" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="검색할 식당 이름을 입력해주세요"
            placeholderTextColor={'gray'}
            value={searchStore}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>
      <ScrollView
        style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        {searchStoreList.map((store, index) => (
          <Pressable onPress={() => toRestPage(store.storeid)} key={index}>
            <SearchStore
              key={index}
              name={store.name}
              address={store.address}
              closingTime={store.closeHour}
              storeRate={store.storeRate}
              img={store.img}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// 화면에 실제로 출력되는 식당 정보에 대한 컴포넌트
const SearchStore = ({
  name,
  address,
  closingTime,
  storeRate,
  img,
}: {
  name: string;
  address: string;
  closingTime: string;
  storeRate: number;
  img: string;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#B6BE6A',
      }}>
      <View style={{marginHorizontal: 10}}>
        <Image source={img} style={styles.image} />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 23, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Ionicons name="star-outline" size={15} color="yellow" />

          <Text style={{color: 'black', marginLeft: 5}}>{storeRate}</Text>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16,
  },
  searchContainer: {
    width: 300,
    height: 40,
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 16,
    marginHorizontal: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B6BE6A',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 8,
    marginLeft: 5,
    color: 'black',
  },
  searchButton: {
    padding: 0,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginHorizontal: 10,
    borderColor: '#B6BE6A',
  },
  backButton: {
    height: 40,
    marginBottom: 16,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});

export default SearchPage;
