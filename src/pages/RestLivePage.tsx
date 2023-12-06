import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import {retrieveToken} from '../store/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddLiveReviewPage from './AddLiveReviewPage';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'AddLiveReviewPage'
>;

type RestLiveReviewPageProps = {
  storeid: number;
  navigation: MainPageScreenProps['navigation'];
};

interface liveReviewData {
  liveReviewId: number;
  liveReviewContent: string;
  writerNickName: string;
}

function RestLivePage({storeid, navigation}: RestLiveReviewPageProps) {
  const toAddLiveReviewPage = () => {
    navigation.navigate('AddLiveReviewPage', {storeid});
  };

  const [liveReviewList, setLiveReviewList] = useState<Array<liveReviewData>>(
    [],
  );

  const fetchData = useCallback(async () => {
    try {
      const token = await retrieveToken(); // 여기에 토큰을 설정합니다.
      const response = await axios.get(
        `http://kymokim.iptime.org:11080/api/liveReview/get/${storeid}`,
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      const data = response.data.data;
      if (data && Array.isArray(data)) {
        setLiveReviewList(
          data.map(liveReviewItem => ({
            liveReviewId: liveReviewItem.liveReviewId,
            liveReviewContent: liveReviewItem.liveReviewContent,
            writerNickName: liveReviewItem.writerNickName,
          })),
        );
      } else {
        console.error('데이터가 올바르게 반환되지 않았습니다.');
      }
    } catch (e) {
      console.error('데이터 가져오기 실패', e);
    }
  }, [storeid]);

  useEffect(() => {
    fetchData();

    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 10000);

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return () => {
      clearInterval(fetchDataInterval);
      unsubscribe();
    };
  }, [fetchData, navigation]);

  return (
    <View>
      <View style={styles.AddMenuWrapper}>
        <TouchableOpacity style={styles.AddMenu} onPress={toAddLiveReviewPage}>
          <Text style={{color: 'gray', fontSize: 12}}>실시간 리뷰 작성</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {liveReviewList.map((liveReview, index) => (
          <Pressable key={index}>
            <LiveReviewItem
              key={index}
              liveContent={liveReview.liveReviewContent}
              writerNickName={liveReview.writerNickName}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const LiveReviewItem = ({
  liveContent,
  writerNickName,
}: {
  liveContent: string;
  writerNickName: string;
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
              source={require('../assets/profileImage.png')}
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
            </View>
            {/* 이미지 통신 뚫으면 여기에 이미지 넣는 컴포넌트 추가 */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 30,
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 15,
              marginRight: 20,
            }}>
            {liveContent}
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
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 30,
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

export default RestLivePage;
