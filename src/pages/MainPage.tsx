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

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'MainPage'
>;

function MainPage({navigation}: MainPageScreenProps): React.JSX.Element {
  const toSearchPage = () => {
    navigation.navigate('SearchPage');
  };

  const toRestListPage = (tabName: string) => {
    navigation.navigate('RestListPage', {screen: tabName});
  };

  return (
    <DismissKeyboardView style={{backgroundColor: 'white'}}>
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
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
          <Pressable onPress={toSearchPage}>
            <View style={{flex: 3, marginTop: 10}} pointerEvents="none">
              <IconTextInput
                placeholder="오늘은 어디로?"
                iconName="search-outline"
              />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: 'column',
          }}>
          <View style={styles.ViewFood}>
            <View style={styles.foods}>
              <Pressable onPress={() => toRestListPage('Korea')}>
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
          <ScrollView horizontal={true}>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
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
            내주변 가까운 맛집
          </Text>
          <ScrollView horizontal={true}>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Image
                source={require('../assets/food1.png')}
                style={styles.Scrollimage}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                땀땀
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
                강남구 강남대로 98길 12-5
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </DismissKeyboardView>
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
