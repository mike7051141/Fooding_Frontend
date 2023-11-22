import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {retrieveToken} from '../store/storage';

type MainPageScreenProps = NativeStackScreenProps<MainPageStackParamList>;

type UpdateMenuPageProps = {
  route: {
    params: {
      reviewId: number;
    };
  };
  navigation: MainPageScreenProps['navigation'];
};

function UpdateReviewPage({route, navigation}: UpdateMenuPageProps) {
  // 수정할 후기의 reviewId 저장하는 변수
  const {reviewId} = route.params;

  // 중복 요청 방지 변수
  const [loading, setLoading] = useState(false);

  // 수정 사항 입력받은 후기, 평점 저장하는 변수
  const [reviewContent, setReviewContent] = useState('');
  const [rate, setRate] = useState('');

  const UpdateReview = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!reviewContent || !reviewContent.trim()) {
      return Alert.alert('알림', '수정할 후기를 입력해주세요.');
    }
    if (!rate || !rate.trim()) {
      return Alert.alert('알림', '수정할 평점을 입력해주세요.');
    }
    try {
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.put(
        'http://kymokim.iptime.org:11080/api/review/update',
        {
          reviewContent: reviewContent,
          rate: rate,
          reviewId: reviewId,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      navigation.goBack();
      Alert.alert('알림', '후기 수정 완료');
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
        } else if (error.response?.status === 400) {
          // 삭제 권한이 없는 경우
          Alert.alert('알림', '수정 권한이 없습니다.');
        } else {
          // 기타 오류
          Alert.alert('알림', '후기 수정에 실패했습니다.');
        }
      } else {
        // Axios 에러가 아닌 경우에 대한 처리
        Alert.alert('알림', '후기 수정에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [loading, reviewContent, rate, reviewId]);

  return (
    <DismissKeyboardView style={styles.wrapper}>
      <ScrollView>
        {/* 상단바 */}
        <View style={styles.topBar}>
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>후기 수정</Text>
          </View>
          {/* 완료 버튼 */}
          <TouchableOpacity style={styles.emptyButton} onPress={UpdateReview}>
            <Ionicons name="checkmark-outline" size={24} color="green" />
          </TouchableOpacity>
        </View>

        {/* 추가할 메뉴 정보 입력 */}
        <View style={styles.menuInputContainer}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="reader-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>후기</Text>
          </View>
          <TextInput
            style={styles.menuInput}
            placeholder="식당의 후기를 수정해주세요."
            value={reviewContent}
            onChangeText={text => setReviewContent(text)}
          />

          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={22}
              color={'black'}
            />
            <Text style={styles.holdText}>평점</Text>
          </View>
          <TextInput
            style={styles.menuInput}
            placeholder="식당의 평점을 수정해주세요."
            value={rate}
            onChangeText={text => setRate(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="images-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>후기 사진을 수정해주세요.</Text>
            {/* 사진 추가할 때 누를 버튼 */}
            <TouchableOpacity style={styles.imageUpload}>
              <Text style={{color: '#B6BE6A', fontSize: 11}}>수정</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require('../assets/image22.png')}
              style={styles.image}
            />
          </View>
        </View>
      </ScrollView>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  holdText: {
    color: 'black',
    marginBottom: 13,
    fontSize: 15,
    marginLeft: 7,
  },
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
  menuInputContainer: {
    backgroundColor: 'white',
    padding: 35,
  },
  menuInput: {
    fontSize: 12,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
  },
  image: {
    alignItems: 'center',
    width: 150,
    height: 120,
    borderRadius: 10,
  },
  imageUpload: {
    marginLeft: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#B6BE6A',
    width: 35,
    height: 18,
    alignItems: 'center', // 가로 정렬
    justifyContent: 'center', // 세로 정렬
  },
});

export default UpdateReviewPage;
