import React from 'react';
import {View, Text} from 'react-native';

function AddMenuPage({route}: any) {
  const {copyStoreId} = route.params;

  return (
    <View>
      <Text>메뉴 추가 페이지 - Store ID: {copyStoreId}</Text>
    </View>
  );
}

export default AddMenuPage;
