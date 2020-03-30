import { Header, Avatar, Badge, Icon } from 'react-native-elements';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Alert } from 'react-native';

import { onLogout } from '../api/Users';

const centerComponents = (avatar, name) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Avatar
          rounded
          source={{ uri: avatar }}
          size="medium"
          activeOpacity={0.7}
        />

        <Badge
          status="success"
          containerStyle={{ position: 'relative', top: -4, right: -20 }}
        />
      </View>
      <Text
        style={{
          marginLeft: '5%',
          fontSize: 40,
          color: 'white',
          fontWeight: '800',
        }}>
        {name}
      </Text>
    </View>
  );
};

const logOut = navigation => {
  const reset = '';
  Alert.alert('Thông báo', 'Bạn có muốn đăng xuất', [
    {
      text: 'OK',
      onPress: () =>
        onLogout()
          .then(() => navigation.navigate('Login', { reset }))
          .catch(e => console.log(e)),
    },
  ]);
};

export const listfriendHeader = (avatar, name, navigation) => {
  // Header của screen Lisfriend
  return (
    <Header
      ViewComponent={LinearGradient}
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        onPress: () => {
          console.log('aaa');
        },
      }}
      centerComponent={centerComponents(avatar, name)}
      rightComponent={
        <Icon
          name="sign-out"
          type="font-awesome"
          color="#fff"
          onPress={() => logOut(navigation)}
        />
      }
      containerStyle={{
        backgroundColor: '#42a5f5',
        justifyContent: 'space-around',
        height: '40%',
      }}
      linearGradientProps={{
        colors: ['#42a5f5', '#66a2d1'],
      }}
    />
  );
};

export const chatBox = (avatar, name, navigation) => {
  // Header của screen ChatBox
  return (
    <Header
      ViewComponent={LinearGradient}
      leftComponent={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="chevron-left"
            type="font-awesome"
            color="#fff"
            onPress={() => navigation.goBack()}
          />
          <View>
            <Avatar
              rounded
              source={{ uri: avatar }}
              size="medium"
              activeOpacity={0.7}
              containerStyle={{ marginLeft: 20}}
            />
          </View>
        </View>
      }
      centerComponent={
        <Text
          style={{
            marginLeft: '5%',
            fontSize: 30,
            color: 'white',
            fontWeight: '800',
          }}>
          {name}
        </Text>
      }
      rightComponent={
        <View style={{ flexDirection: 'row' }}>
          <Icon name="video" type="foundation" color="#fff" size={25}  containerStyle={{ marginRight: 20}} />
          <Icon name="call" type="material" color="#fff" size={25} />
        </View>
      }
      containerStyle={{
        backgroundColor: '#42a5f5',
        justifyContent: 'space-around',
        height: '10%',
      }}
      linearGradientProps={{
        colors: ['#42a5f5', '#66a2d1'],
      }}
    />
  );
};

const header = {
  listfriendHeader,
  chatBox,
};

export default header;
