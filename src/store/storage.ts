import AsyncStorage from '@react-native-async-storage/async-storage';

// 토큰을 저장하는 함수

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('토큰 저장 중 오류 발생:', error);
  }
};

// 저장된 토큰을 불러오는 함수
export const retrieveToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token != null) {
      return token;
    }
  } catch (error) {
    console.error('토큰 불러오기 중 오류 발생:', error);
  }
  return null; // 토큰이 없으면 null 반환
};

(async () => {
  console.log(await retrieveToken());
})();

// export const saveToken = async (token: string) => {
//   try {
//     await AsyncStorage.setItem('token', token);
//     console.log('저장', token);
//   } catch (error) {
//     console.error('토큰 저장 오류:', error);
//   }
// };

// // 토큰 가져오기
// export const getToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     return token;
//   } catch (error) {
//     console.error('토큰 가져오기 오류:', error);
//     return null;
//   }
// };
