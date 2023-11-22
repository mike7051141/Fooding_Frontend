import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
import {MainPageStackParamList} from '../components/MainStack';
import DismissKeyboardView from '../components/DissmissKeyboardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'AddMenuPage'
>;

type AddMenuPageProps = {
  route: any;
  navigation: MainPageScreenProps['navigation'];
};

function AddReviewPage({route, navigation}: AddMenuPageProps) {
  // 해당 식당의 storeId
  const {storeid} = route.params;

  // 중복 요청 방지 변수
  const [loading, setLoading] = useState(false);

  // 입력받은 평점, 후기 저장하는 변수
  const [rate, setRate] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  const AddReview = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!reviewContent || !reviewContent.trim()) {
      return Alert.alert('알림', '식당의 후기를 입력해주세요.');
    }
    if (!rate || isNaN(Number(rate))) {
      return Alert.alert('알림', '식당의 평점을 숫자로 입력해주세요.');
    }
    try {
      // 이 부분에 이제 새로 추가한 메뉴 put 방식으로 update 하기 (UpdatePage.tsx 참고)
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.post(
        'http://kymokim.iptime.org:11080/api/review/create',
        {
          reviewContent: reviewContent,
          rate: rate,
          storeId: storeid,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      navigation.goBack();
      Alert.alert('알림', '후기 작성 완료');
    } catch (error) {
      console.error('후기 작성 실패', error);
    } finally {
      setLoading(false);
    }
  }, [
    // 넣어야 할 변수들 넣기
    loading,
    rate,
    reviewContent,
  ]);

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
            <Text style={styles.headerTitle}>후기 작성</Text>
          </View>
          {/* 완료 버튼 */}
          <TouchableOpacity style={styles.emptyButton} onPress={AddReview}>
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
            placeholder="식당의 후기를 입력해주세요."
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
            placeholder="식당의 평점을 입력해주세요."
            value={rate}
            onChangeText={text => setRate(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="images-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>후기 사진을 첨부해주세요.</Text>
            {/* 사진 추가할 때 누를 버튼 */}
            <TouchableOpacity style={styles.imageUpload}>
              <Text style={{color: '#B6BE6A', fontSize: 11}}>추가</Text>
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

export default AddReviewPage;
