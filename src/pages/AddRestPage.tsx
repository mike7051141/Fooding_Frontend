import React, {useCallback, useState, useEffect} from 'react';
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

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'RestPage' | 'AddRestWritePage'
>;

function AddRestPage({navigation}: MainPageScreenProps) {
  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  const toAddRestWritePage = () => {
    navigation.navigate('AddRestWritePage');
  };

  const [loading, setLoading] = useState(false);
  const [searchStore, setSearchStore] = useState('');
  const [searchStoreList, setSearchStoreList] = useState<
    Array<SearchStoreData>
  >([]);

  interface SearchStoreData {
    name: string;
    rating: number;
    address: string;
    closeHour: string;
    img: any; // 이미지에 대한 정보가 없어서 any로 처리
  }

  const listUpStore = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
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
            closeHour: storeItem.closeHour.toString(),
            img: require('../assets/image23.png'),
          })),
        );
      } else {
        console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
      }
    } catch (error) {
      console.error('식당 조회 실패', error);
    }
    // 이 놈의 위치가 문제인지 아님 코드가 문제인지 모르겠음 일단 이거 내일 다시 수정 ㄱㄱ
    /*
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setSearchStoreList([]);
        listUpStore();
      });
      return unsubscribe;
    }, [navigation]);
    */
  }, [loading, navigation]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="이미 있는 식당은 아닌가요?"
            placeholderTextColor="#B6BE6A"
            value={searchStore}
            onChangeText={text => setSearchStore(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={listUpStore}>
            <Ionicons name="search-outline" size={30} color="#B6BE6A" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {searchStoreList.map((Rest, index) => (
          <Pressable onPress={toRestPage} key={index}>
            <RestItem
              key={index}
              name={Rest.name}
              rating={Rest.rating}
              address={Rest.address}
              closingTime={Rest.closeHour}
            />
          </Pressable>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={toAddRestWritePage}>
        <Ionicons name="duplicate-outline" size={40} color="#B6BE6A" />
      </TouchableOpacity>
    </View>
  );
}

const RestItem = ({
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
  const renderStars = (rating: number) => {
    const yellowStars = [];
    const grayStars = [];

    for (let i = 0; i < rating; i++) {
      yellowStars.push(
        <Ionicons
          key={i}
          name="star"
          size={15}
          color="yellow"
          style={styles.Scrollstar}
        />,
      );
    }

    for (let i = rating; i < 5; i++) {
      grayStars.push(
        <Ionicons
          key={i}
          name="star-outline"
          size={15}
          color="gray"
          style={styles.Scrollstar}
        />,
      );
    }

    return (
      <View style={{flexDirection: 'row'}}>
        {yellowStars}
        {grayStars}
      </View>
    );
  };
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
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{renderStars(rating)}</Text>
          <Text style={{color: 'black'}}>{rating}</Text>
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
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default AddRestPage;
