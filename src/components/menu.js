import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { onLogout } from '../api/Users';

const navigate = navigation => {
  Alert.alert('Thông báo', 'Vui lòng cập nhật thông tin', [
    {
      text: 'OK',
      onPress: () => navigation.navigate('UpdateProfile'),
    },
  ]);
};

const logOut = navigation => {
  Alert.alert('Thông báo', 'Bạn có muốn đăng xuất', [
    {
      text: 'OK',
      onPress: () =>
        onLogout()
          .then(() => navigation.navigate('Login'))
          .catch(e => console.log(e)),
    },
  ]);
};

export const menuR = navigation => {
  return (
    <View
      style={{
        width: '50%',
        height: 105,
        marginRight: 2,
        backgroundColor: '#bcaaa4',
        marginLeft: '50%',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#d7ccc8',
          alignItems: 'flex-end',
          borderRadius: 20,
        }}>
        <TouchableOpacity
          style={{ borderBottomWidth: 2, margin: 5 }}
          onPress={() => navigate(navigation)}>
          <Text style={{ fontSize: 22 }}>Thay đổi thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logOut(navigation)}
          style={{ borderBottomWidth: 2, margin: 5 }}>
          <Text style={{ fontSize: 22 }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
