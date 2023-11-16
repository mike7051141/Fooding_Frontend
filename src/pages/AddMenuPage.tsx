import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import DismissKeyboardView from '../components/DissmissKeyboardView';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'AddMenuPage'
>;

type AddMenuPageProps = {
  route: any;
  navigation: MainPageScreenProps['navigation'];
};

function AddMenuPage({route, navigation}: AddMenuPageProps) {
  const {copyStoreId} = route.params;
  console.log('메뉴 추가 페이지로 넘어온 storeId : ', copyStoreId);

  // 입력받은 메뉴 이름, 메뉴 소개, 메뉴 가격 저장하는 변수
  const [menuName, setMenuName] = useState('');
  const [menuIntroduction, setMenuIntroduction] = useState('');
  const [menuPrice, setMenuPrice] = useState('');

  // 중복 요청 방지 변수
  const [loading, setLoading] = useState(false);

  const AddMenu = useCallback(
    async () => {
      if (loading) {
        return;
      }

      try {
        // 이 부분에 이제 새로 추가한 메뉴 put 방식으로 update 하기 (UpdatePage.tsx 참고)
      } catch (error) {
        console.error('사용자 정보 업데이트 실패', error);
      }
    },
    [
      // 넣어야 할 변수들 넣기
    ],
  );

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
            <Text style={styles.headerTitle}>메뉴 추가</Text>
          </View>
          {/* 완료 버튼 */}
          <TouchableOpacity style={styles.emptyButton} onPress={AddMenu}>
            <Ionicons name="checkmark-outline" size={24} color="green" />
          </TouchableOpacity>
        </View>

        {/* 추가할 메뉴 정보 입력 */}
        <View style={styles.menuInputContainer}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="reader-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>메뉴 이름</Text>
          </View>
          <TextInput
            style={styles.menuInput}
            placeholder="메뉴의 이름을 입력해주세요."
            value={menuName}
            onChangeText={text => setMenuName(text)}
          />

          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={22}
              color={'black'}
            />
            <Text style={styles.holdText}>메뉴 소개</Text>
          </View>
          <TextInput
            style={styles.menuInput}
            placeholder="메뉴의 소개를 입력해주세요."
            value={menuIntroduction}
            onChangeText={text => setMenuIntroduction(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="server-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>메뉴 가격</Text>
          </View>
          <TextInput
            style={styles.menuInput}
            placeholder="메뉴의 가격을 입력해주세요."
            keyboardType="numeric"
            value={menuPrice}
            onChangeText={text => setMenuPrice(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="images-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>메뉴의 사진을 첨부해주세요.</Text>
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

export default AddMenuPage;
