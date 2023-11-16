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
      menuId: number; // menuId 추가
    };
  };
  navigation: MainPageScreenProps['navigation'];
};

function UpdateMenuPage({route, navigation}: UpdateMenuPageProps) {
  const {menuId} = route.params;

  // 입력받은 메뉴 이름, 메뉴 소개, 메뉴 가격 저장하는 변수
  const [menuName, setMenuName] = useState('');
  const [menuIntroduction, setMenuIntroduction] = useState('');
  const [menuPrice, setMenuPrice] = useState('');

  // 중복 요청 방지 변수
  const [loading, setLoading] = useState(false);

  const UpdateMenu = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!menuName || !menuName.trim()) {
      return Alert.alert('알림', '수정할 메뉴의 이름을 입력해주세요.');
    }
    if (!menuIntroduction || !menuIntroduction.trim()) {
      return Alert.alert('알림', '수정할 메뉴의 소개를 입력해주세요.');
    }
    if (!menuPrice || !menuPrice.trim()) {
      return Alert.alert('알림', '수정할 메뉴의 가격을 입력해주세요.');
    }
    try {
      setLoading(true);
      const token = await retrieveToken();
      const response = await axios.put(
        'http://kymokim.iptime.org:11080/api/menu/update',
        {
          menuContent: menuIntroduction,
          menuId: menuId,
          menuName: menuName,
          price: menuPrice,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      console.log('메뉴 정보 수정 완료');
      navigation.goBack();
      Alert.alert('알림', '메뉴 수정 완료');
    } catch (error) {
      console.error('메뉴 정보 수정 실패', error);
    } finally {
      setLoading(false);
    }
  }, [loading, menuIntroduction, menuId, menuName, menuPrice]);

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
            <Text style={styles.headerTitle}>메뉴 수정</Text>
          </View>
          {/* 완료 버튼 */}
          <TouchableOpacity style={styles.emptyButton} onPress={UpdateMenu}>
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
            placeholder="수정할 메뉴의 이름을 입력해주세요."
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
            placeholder="수정할 메뉴의 소개를 입력해주세요."
            value={menuIntroduction}
            onChangeText={text => setMenuIntroduction(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="server-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>메뉴 가격</Text>
          </View>
          <TextInput
            style={styles.menuInput}
            placeholder="수정할 메뉴의 가격을 입력해주세요."
            keyboardType="numeric"
            value={menuPrice}
            onChangeText={text => setMenuPrice(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="images-outline" size={22} color={'black'} />
            <Text style={styles.holdText}>
              수정할 메뉴의 사진을 첨부해주세요.
            </Text>
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

export default UpdateMenuPage;
