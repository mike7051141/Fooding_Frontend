import React, {useState} from 'react';
import {View, Button, Image, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {retrieveToken} from '../../store/storage';

const ChinaFoodPage: React.FC = () => {
  const [imgFile, setImgFile] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    try {
      const imagePickerOptions = {
        width: 300,
        height: 400,
        cropping: true,
      };

      ImagePicker.openPicker(imagePickerOptions).then(image => {
        // 이미지 선택 후 처리
        const file = {
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop(),
        };
        setImgFile(file);
        if (image.path) {
          setSelectedImage(image.path);
        }
      });
    } catch (error) {
      console.error('Error selecting image', error);
    }
  };

  const handleImageUpload = async () => {
    const token = await retrieveToken();

    // 이미지 정보 확인
    if (!imgFile) {
      Alert.alert('경고', '이미지를 선택하세요.');
      return;
    }

    // FormData 생성
    const formData = new FormData();

    // 이미지 파일 추가
    formData.append('file', imgFile);

    // 추가 데이터를 JSON 문자열로 추가
    const jsonData = {storeId: 2004, decId: 0};
    const jsonString = JSON.stringify(jsonData);
    const blob = new Blob([jsonString], {
      type: 'application/json',
    } as BlobOptions);
    formData.append('uploadImgDto', blob);

    try {
      const headers: Record<string, string> = {
        // 'Content-Type': 'multipart/form-data', // 주석 처리: 자동으로 설정됨
      };

      if (token) {
        headers['x-auth-token'] = token;
      }

      const response = await fetch(
        'http://kymokim.iptime.org:11080/api/store/uploadImg',
        {
          method: 'POST',
          headers: headers,
          mode: 'cors',
          credentials: 'include',
          body: formData,
        },
      );

      const data = await response.json();
      // 서버 응답 처리
      console.log(data);
    } catch (error) {
      // 오류 처리
      console.error('에러:', error);
    }
  };

  //프로필 이미지
  const propleImageUpload = async () => {
    if (!selectedImage) {
      Alert.alert('경고', '이미지를 선택하세요.');
      return;
    }

    try {
      const formData1 = new FormData();
      formData1.append('file', imgFile);

      const token = await retrieveToken();
      const headers: Record<string, string> = {
        'Content-Type': 'multipart/form-data',
      };

      if (token) {
        headers['x-auth-token'] = token;
      }

      const response = await fetch(
        'http://kymokim.iptime.org:11080/api/auth/uploadImg',
        {
          method: 'POST',
          headers: headers,
          body: formData1,
        },
      );

      console.log(imgFile);
      console.log(response);

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  return (
    <>
      <View>
        <Button title="이미지 선택" onPress={handleImagePicker} />
        {selectedImage && (
          <Image
            source={{uri: selectedImage}}
            style={{width: 200, height: 200}}
          />
        )}
        <Button title="이미지 업로드" onPress={handleImageUpload} />
      </View>
      <View>
        <Button title="프로필 이미지 업로드" onPress={propleImageUpload} />
      </View>
    </>
  );
};

export default ChinaFoodPage;
