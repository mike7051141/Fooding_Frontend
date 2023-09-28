import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, TextInput} from 'react-native';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import RestListPage from './RestListPage';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {MainPageStackParamList} from '../components/MainStack';

const Stack = createNativeStackNavigator();

const MyNearPlacesData = [
  {
    name: '레스토랑 1',
    rating: 4.5,
    address: '주소 1',
  },
  {
    name: '레스토랑 2',
    rating: 3.8,
    address: '주소 2',
  },
  {
    name: '레스토랑 3',
    rating: 3.8,
    address: '주소 3',
  },
];

const RecentPlacesData = [
  {
    name: '레스토랑 4',
    rating: 4.5,
    address: '주소 4',
  },
  {
    name: '레스토랑 5',
    rating: 3.8,
    address: '주소 5',
  },
  {
    name: '레스토랑 6',
    rating: 3.8,
    address: '주소 7',
  },
];

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'MainPage'
>;

function MainPage({navigation}: MainPageScreenProps): React.JSX.Element {
  const toSearchPage = () => {
    navigation.navigate('SearchPage');
  };

  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  const toRestListPage = (tabName: string) => {
    navigation.navigate('RestListPage', {screen: tabName});
  };

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          backgroundColor: '#B6BE6A',
          padding: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'gray'}}>지금 내 위치는</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.LocationText}>내 위치</Text>
        </View>
        <View style={{flex: 3, marginTop: 10}}>
          <Pressable onPress={toSearchPage}>
            <View pointerEvents="none">
              <IconTextInput
                placeholder="오늘은 어디로?"
                iconName="search-outline"
              />
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: 'column',
        }}>
        <View style={styles.ViewFood}>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('KoreaFoodPage')}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>한식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('China')}>
              <Image
                source={require('../assets/food2.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>중식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage1')}>
              <Image
                source={require('../assets/food3.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>양식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage2')}>
              <Image
                source={require('../assets/food4.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>일식</Text>
          </View>
          <View style={styles.foods}>
            <Pressable onPress={() => toRestListPage('FoodPage3')}>
              <Image
                source={require('../assets/food5.png')}
                style={styles.image}
              />
            </Pressable>
            <Text style={styles.FoodsText}>야식</Text>
          </View>
        </View>
        <View style={styles.ViewFood}>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food6.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>디저트</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food7.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>치킨</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food8.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>피자</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food9.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>분식</Text>
          </View>
          <View style={styles.foods}>
            <Image
              source={require('../assets/food10.png')}
              style={styles.image}
            />
            <Text style={styles.FoodsText}>패스트푸드</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            margin: 5,
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          내주변 가까운 맛집
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {MyNearPlacesData.map((MyNearPlace, index) => (
            <Pressable onPress={toRestPage} key={index}>
              <MyNearPlaces
                key={index}
                name={MyNearPlace.name}
                rating={MyNearPlace.rating}
                address={MyNearPlace.address}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
          marginBottom: 20,
        }}>
        <Text
          style={{
            margin: 5,
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          최근 방문한 장소
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {RecentPlacesData.map((RecentPlace, index) => (
            <RecentPlaces
              key={index}
              name={RecentPlace.name}
              rating={RecentPlace.rating}
              address={RecentPlace.address}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  LocationText: {
    color: 'white',
    marginLeft: 30,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },

  ViewFood: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  foods: {
    flex: 1,
    alignItems: 'center',
  },
  FoodsText: {
    color: 'black',
    fontWeight: 'bold',
  },

  imageContainer: {
    margin: 10,
  },
  image: {
    alignItems: 'center',
    width: 60,
    height: 60,
  },

  Scrollimage: {
    width: 150,
    height: 70,
  },
  Scrollstar: {
    color: 'gray',
  },
  ScrollText: {},
});

const MyNearPlaces = ({
  name,
  rating,
  address,
}: {
  name: string;
  rating: number;
  address: string;
}) => {
  return (
    <>
      <View style={{marginLeft: 20}}>
        <Image
          source={require('../assets/food1.png')}
          style={styles.Scrollimage}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
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
          <Text style={{color: 'black'}}>4.0 (302)</Text>
        </View>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
          {address}
        </Text>
      </View>
    </>
  );
};

const RecentPlaces = ({
  name,
  rating,
  address,
}: {
  name: string;
  rating: number;
  address: string;
}) => {
  return (
    <>
      <View style={{marginLeft: 20}}>
        <Image
          source={require('../assets/food1.png')}
          style={styles.Scrollimage}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
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
          <Text style={{color: 'black'}}>4.0 (302)</Text>
        </View>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
          {address}
        </Text>
      </View>
    </>
  );
};

interface IconTextInputProps {
  iconName: string; // iconName 프로퍼티의 타입을 string으로 명시적으로 지정
  placeholder: string;
}

const IconTextInput: React.FC<IconTextInputProps> = ({
  iconName,
  placeholder,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginHorizontal: 30,
      }}>
      <TextInput
        placeholder={placeholder}
        style={{flex: 1, height: 40, color: '#B6BE6A'}}
      />
      <Ionicons name={iconName} size={20} color="#B6BE6A" />
    </View>
  );
};

export default MainPage;
