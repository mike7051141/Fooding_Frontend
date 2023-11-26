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

    if (!selectedImage) {
      Alert.alert('경고', '이미지를 선택하세요.');
      return;
    }

    try {
      const formData = new FormData();
      // const uploadImgDto = {
      //   storeId: 18,
      //   decId: 0,
      // };
      // const blob = new Blob([JSON.stringify(uploadImgDto)], {
      //   type: 'application/json',
      // });

      // formData.append('uploadImgDto', blob);
      formData.append('image', imgFile);

      console.log(formData);
      console.log(formData.getParts());
      const response = await axios.post(
        'http://kymokim.iptime.org:11080/api/store/uploadImg',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          },
        },
      );

      // 서버 응답 처리
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  //프로필 이미지
  const propleImageUpload = async () => {
    const token = await retrieveToken();

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
