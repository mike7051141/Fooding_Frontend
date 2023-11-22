import React, {useState} from 'react';
import {View, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {retrieveToken} from '../../store/storage';

interface ChinaFoodPageProps {}

const ChinaFoodPage: React.FC<ChinaFoodPageProps> = () => {
  const [imgFile, setImgFile] = useState<any>(null);
  const [imageSource, setImageSource] = useState<string | null>(null);

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      const file = {
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      };

      setImgFile(file);
      setImageSource(image.path);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const photoBlob = new Blob([imgFile]);
      formData.append('file', photoBlob);

      //formData.append('file', imgFile);

      // Modify the structure of the JSON payload
      //formData.append('uploadImgDto', JSON.stringify({storeId: 2, decId: 0}));

      const json1 = JSON.stringify({storeId: 1, decId: 0});
      const blob1 = new Blob([json1]);
      formData.append('uploadImgDto', blob1);

      const token = await retrieveToken();
      const headers: Record<string, string> = {
        // Remove 'Content-Type' from headers since FormData sets it automatically
        Accept: 'application/json',
      };

      if (token) {
        headers['x-auth-token'] = token;
      }

      const response = await fetch(
        'http://kymokim.iptime.org:11080/api/store/uploadImg',
        {
          method: 'POST',
          headers: headers,
          body: formData,
          mode: 'cors',
        },
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <View>
      {imageSource && (
        <Image source={{uri: imageSource}} style={{width: 200, height: 200}} />
      )}
      <Button title="Select Image" onPress={handleImagePicker} />
      <Button title="Send Image" onPress={handleSubmit} />
    </View>
  );
};

export default ChinaFoodPage;
