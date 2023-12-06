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

type AddLiveReviewPageProps = {
  route: any;
  navigation: MainPageScreenProps['navigation'];
};

function AddLiveReviewPage({route, navigation}: AddLiveReviewPageProps) {
  const {storeid} = route.params;
  const [loading, setLoading] = useState(false);

  const [liveReviewContent, setLiveReviewContent] = useState('');

  const AddLiveReview = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!liveReviewContent || !liveReviewContent.trim()) {
      return Alert.alert('알림', '식당의 실시간 리뷰를 입력해주세요.');
    }
    try {
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.post(
        'http://kymokim.iptime.org:11080/api/liveReview/create',
        {
          liveReviewContent: liveReviewContent,
          storeId: storeid,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      navigation.goBack();
      Alert.alert('알림', '실시간 리뷰 작성 완료');
    } catch (error) {
      console.error('실시간 리뷰 작성 실패', error);
    } finally {
      setLoading(false);
    }
  }, [
    // 넣어야 할 변수들 넣기
    loading,
    liveReviewContent,
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
            <Text style={styles.headerTitle}>실시간 리뷰 작성</Text>
          </View>
          {/* 완료 버튼 */}
          <TouchableOpacity style={styles.emptyButton} onPress={AddLiveReview}>
            <Ionicons name="checkmark-outline" size={24} color="green" />
          </TouchableOpacity>
        </View>

        {/* 추가할 메뉴 정보 입력 */}
        <View style={styles.menuInputContainer}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="reader-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>실시간 리뷰</Text>
          </View>
          <TextInput
            style={styles.menuInput}
            placeholder="식당의 실시간 리뷰를 입력해주세요."
            value={liveReviewContent}
            onChangeText={text => setLiveReviewContent(text)}
          />
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

export default AddLiveReviewPage;
