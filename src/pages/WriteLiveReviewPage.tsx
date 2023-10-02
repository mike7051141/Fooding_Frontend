import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

const LiveReviewData = [
  {
    myImg: require('../assets/defaultProfile.png'),
    userName: '김영훈',
    rating: 4.5,
    userLiveReview: 'wow',
    restName: '땀땀',
    foodImg: require('../assets/RestImage.png'),
  },
  {
    myImg: require('../assets/defaultProfile.png'),
    userName: '김민기',
    rating: 5.0,
    userLiveReview: 'Good',
    restName: '낙원식당',
    foodImg: require('../assets/RestImage.png'),
  },
];

const LiveReviewImageData = [
  {
    LiveReviewImg: require('../assets/RestImage.png'),
  },
  {
    LiveReviewImg: require('../assets/food10.png'),
  },
  {
    LiveReviewImg: require('../assets/food2.png'),
  },
  {
    LiveReviewImg: require('../assets/food2.png'),
  },
  {
    LiveReviewImg: require('../assets/food2.png'),
  },
  {
    LiveReviewImg: require('../assets/food2.png'),
  },
];

/*
type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'RestPage' | 'AddRestWritePage'
>;
*/

function WriteLiveReviewPage(/*{navigation}: MainPageScreenProps*/) {
  /*
  const toRestPage = () => {
    navigation.navigate('RestPage');
  };

  const toAddRestWritePage = () => {
    navigation.navigate('AddRestWritePage');
  };
  */

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="어떤 식당에 실시간 리뷰를 작성할건가요?"
            placeholderTextColor="#B6BE6A"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={30} color="#B6BE6A" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerFixInfo}>
          <Text style={styles.headerFixText}>최근 내가 남긴 후기</Text>
          <Ionicons name="chatbox-outline" size={50} color={'black'} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {LiveReviewData.map((LiveReview, index) => (
          <Pressable key={index}>
            <LiveReviewItem
              key={index}
              myImg={LiveReview.myImg}
              userName={LiveReview.userName}
              rating={LiveReview.rating}
              userLiveReview={LiveReview.userLiveReview}
              restName={LiveReview.restName}
              foodImg={LiveReview.foodImg}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const LiveReviewItem = ({
  myImg,
  userName,
  rating,
  userLiveReview,
  restName,
  foodImg,
}: {
  myImg: any;
  userName: string;
  rating: number;
  userLiveReview: string;
  restName: string;
  foodImg: any;
}) => {
  return (
    <View style={styles.contentContainer}>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 5,
          }}>
          <View style={styles.imageFrame}>
            <Image source={myImg} style={styles.image} />
          </View>
          <View
            style={{
              marginLeft: 20,
              paddingVertical: 12,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                {userName} ({restName})
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>평점 : {rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 30,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Ionicons
            name="return-down-forward-outline"
            size={30}
            color="black"
          />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: 10,
            }}>
            {userLiveReview}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginLeft: 20}}>
          {LiveReviewImageData.map((LiveReviewImage, index) => (
            <LiveReviewImages
              key={index}
              liveReviewImg={LiveReviewImage.LiveReviewImg}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const LiveReviewImages = ({liveReviewImg}: {liveReviewImg: any}) => {
  return (
    <View
      style={{
        marginRight: 10,
        marginTop: 15,
      }}>
      <Image source={liveReviewImg} style={styles.reviewImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16,
  },
  headerContainer: {
    height: 120,
  },
  headerFixInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 35,
  },
  headerFixText: {fontSize: 20, fontWeight: 'bold', color: 'black'},
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
  imageFrame: {
    width: 70,
    height: 70,
    padding: 5,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  reviewImage: {
    width: 80,
    height: 70,
    borderRadius: 10,
  },
});

export default WriteLiveReviewPage;
