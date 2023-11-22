import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {MainPageStackParamList} from '../components/MainStack';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'AddMenuPage'
>;

type AddMenuPageProps = {
  route: any;
  navigation: MainPageScreenProps['navigation'];
};

function AddReviewPage({route, navigation}: AddMenuPageProps) {
  const {storeid} = route.params;
  return (
    <View>
      <Text>넘어온 storeId : {storeid}</Text>
    </View>
  );
}

export default AddReviewPage;
