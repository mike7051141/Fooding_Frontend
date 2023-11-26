import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../../components/MainStack';
import {retrieveToken, storeToken} from '../../store/storage';
import axios from 'axios';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'RestPage'
>;

function LateNightFoodPage({navigation}: MainPageScreenProps) {
  const category = '야식';
  const toRestPage = (storeid: number) => {
    navigation.navigate('RestPage', {storeid: storeid});
  };

  const [searchStoreList, setSearchStoreList] = useState<
    Array<SearchStoreData>
  >([]);

  interface SearchStoreData {
    name: string;
    address: string;
    closeHour: string;
    storeid: number;
    storeRate: number;
    reviewCount: number;
    imgUrl: string;
  }

  const fetchData = async () => {
    try {
      const token = await retrieveToken();
      const response = await axios.get(
        `http://kymokim.iptime.org:11080/api/store/getByCategory/${category}`,
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
            address: storeItem.address,
            closeHour: storeItem.closeHour,
            storeid: storeItem.storeId,
            storeRate: storeItem.storeRate,
            reviewCount: storeItem.reviewCount,
            imgUrl: storeItem.imgUrl,
          })),
        );
      } else {
        console.error(
          '해당 카테고리에 대한 식당들의 데이터가 올바르게 반환되지 않았습니다.',
        );
      }
    } catch (e) {
      console.error('해당 카테고리의 식당들 조회 실패', e);
    }
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* 식당 정보 출력 컴포넌트 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {searchStoreList.map((store, index) => (
          <Pressable onPress={() => toRestPage(store.storeid)} key={index}>
            <RestItem
              key={index}
              name={store.name}
              address={store.address}
              closingTime={store.closeHour}
              storeRate={store.storeRate}
              reviewCount={store.reviewCount}
              imgUrl={store.imgUrl}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const RestItem = ({
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
        borderTopWidth: 1,
        borderColor: 'lightgray',
        height: 150,
      }}>
      <View
        style={{
          marginHorizontal: 20,
        }}>
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
  floatingButton: {
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 2,
    borderColor: '#B6BE6A',
    borderRadius: 50,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,

    borderWidth: 1,
    borderColor: 'lightgray',
  },
});

export default LateNightFoodPage;
