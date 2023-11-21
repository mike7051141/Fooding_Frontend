import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

type MainPageScreenProps = NativeStackScreenProps<MainPageStackParamList>;

type RestReviewPageProps = {
  storeid: number;
  navigation: MainPageScreenProps['navigation'];
};

function RestReviewPage({storeid, navigation}: RestReviewPageProps) {
  //
  interface ReviewData {
    reviewId: number;
    writerNickName: string;
    reviewContent: string;
    rate: number;
  }

  //
  const [reviewList, setReviewList] = useState<Array<ReviewData>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken(); // 여기에 토큰을 설정합니다.
        const response = await axios.get(
          `http://kymokim.iptime.org:11080/api/review/get/${storeid}`,
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        const data = response.data.data;
        if (data && Array.isArray(data)) {
          setReviewList(
            data.map(reviewItem => ({
              reviewId: reviewItem.reviewId,
              writerNickName: reviewItem.writerNickName,
              reviewContent: reviewItem.reviewContent,
              rate: reviewItem.rate,
            })),
          );
        } else {
          console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (e) {
        console.error('데이터 가져오기 실패', e);
      }
    };
    fetchData();
  }, [navigation]);

  return (
    <View>
      <View style={styles.AddMenuWrapper}>
        <TouchableOpacity style={styles.AddMenu}>
          <Text style={{color: 'gray', fontSize: 12}}>후기 작성</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {reviewList.map((Review, index) => (
          <Pressable key={index}>
            <ReviewItem
              key={index}
              reviewId={Review.reviewId}
              writerNickName={Review.writerNickName}
              reviewContent={Review.reviewContent}
              rate={Review.rate}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const ReviewItem = ({
  reviewId, // 23.11.22에 후기 작성 기능 및 후기 수정, 삭제 기능 추가할 경우 reviewId 사용하기
  writerNickName,
  reviewContent,
  rate,
}: {
  reviewId: number;
  writerNickName: string;
  reviewContent: string;
  rate: number;
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
            <Image
              source={require('../assets/food2.png')}
              style={styles.image}
            />
          </View>
          <View
            style={{
              marginLeft: 20,
              paddingVertical: 12,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: 270,
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                {writerNickName}
              </Text>
              <TouchableOpacity style={{marginLeft: 'auto'}}>
                <Ionicons name="clipboard-outline" size={25} color={'black'} />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Ionicons name="trash-outline" size={25} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="star" size={18} color={'#E7D532'} />
              <Text style={{color: 'black'}}> {rate.toFixed(1)}</Text>
            </View>
            {/* 이미지 통신 뚫으면 여기에 이미지 넣는 컴포넌트 추가 */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 40,
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
              fontSize: 15,
              marginLeft: 10,
            }}>
            {reviewContent}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
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
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});

export default RestReviewPage;
