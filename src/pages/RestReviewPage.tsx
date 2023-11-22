import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'AddReviewPage'
>;

type RestReviewPageProps = {
  storeid: number;
  navigation: MainPageScreenProps['navigation'];
};

function RestReviewPage({storeid, navigation}: RestReviewPageProps) {
  const toAddReviewPage = () => {
    navigation.navigate('AddReviewPage', {storeid});
  };

  // 해당 식당에 달린 모든 후기들 정보 담는 배열의 타입
  interface ReviewData {
    reviewId: number;
    writerNickName: string;
    reviewContent: string;
    rate: number;
  }

  // 해당 식당에 달린 모든 후기들 정보 담는 배열 선언
  const [reviewList, setReviewList] = useState<Array<ReviewData>>([]);

  // 후기 출력
  const fetchData = useCallback(async () => {
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
  }, [storeid]);

  useEffect(() => {
    // 컴포넌트가 마운트되거나 navigation focus 이벤트가 발생할 때 데이터를 가져옴
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    // 컴포넌트가 언마운트되면 이벤트 리스너 해제
    return unsubscribe;
  }, [fetchData, navigation]);

  const DeleteReview = async (reviewId: number) => {
    try {
      const token = await retrieveToken();
      await axios.delete(
        `http://kymokim.iptime.org:11080/api/review/delete/${reviewId}`,
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );

      // 삭제 성공 후 데이터를 다시 가져오도록 fetchData 함수 호출
      fetchData();
    } catch (error: any) {
      //console.error('메뉴 삭제 실패', error);

      // 여기서 서버에서 반환한 상태 코드에 따라 알맞은 경고 메시지를 표시할 수 있습니다.
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          // 서버 내부 오류인 경우
          Alert.alert(
            '알림',
            '서버에서 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.',
          );
        } else if (error.response?.status === 500) {
          // 삭제 권한이 없는 경우
          Alert.alert('알림', '삭제 권한이 없습니다.');
        } else {
          // 기타 오류
          Alert.alert('알림', '후기 삭제에 실패했습니다.');
        }
      } else {
        // Axios 에러가 아닌 경우에 대한 처리
        Alert.alert('알림', '후기 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <View>
      <View style={styles.AddMenuWrapper}>
        <TouchableOpacity style={styles.AddMenu} onPress={toAddReviewPage}>
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
              navigation={navigation}
              onDelete={() => DeleteReview(Review.reviewId)}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const ReviewItem = ({
  reviewId, // 23.11.22에 후기 수정 & 삭제 기능 추가할 경우 reviewId 사용하기
  writerNickName,
  reviewContent,
  rate,
  navigation,
  onDelete,
}: {
  reviewId: number;
  writerNickName: string;
  reviewContent: string;
  rate: number;
  navigation: MainPageScreenProps['navigation'];
  onDelete: () => void;
}) => {
  const toUpdateReviewPage = () => {
    navigation.navigate('UpdateReviewPage', {reviewId});
  };
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
                width: 220,
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                {writerNickName}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 'auto'}}
                onPress={toUpdateReviewPage}>
                <Ionicons name="clipboard-outline" size={25} color={'black'} />
              </TouchableOpacity>
              {/* 삭제 버튼 */}
              <TouchableOpacity style={{marginLeft: 10}} onPress={onDelete}>
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
              marginRight: 20,
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
