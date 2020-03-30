import React, { Component } from 'react';

import { ListItem } from 'react-native-elements';
import { TouchableOpacity, Text } from 'react-native';

// ListFriend của user

const renderItem = ({ item }, navigation) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('Chatbox', {
        name: item.name,
        item,
        displayName: item.displayName,
        avatar: item.avatar,
      })
    }>
    <ListItem
      title={
        <Text style={{ fontSize: 22, margin: 5 }}>
          {item.displayName || 'chưa có thông tin'}
        </Text>
      }
      subtitle={<Text style={{ fontSize: 18 }}>{item.name}</Text>}
      leftAvatar={{ source: { uri: item.avatar } }}
      bottomDivider
    />
  </TouchableOpacity>
);

export default renderItem;
