import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { register } from '../../api/Users';
import { pickImageFromDevice, uploadImage } from '../../api/upload';

export default class Register extends Component {
  state = {
    name: '',
    password: '',
    password2: '',
    numberPhone: '',
    avatar: '',
    loading: false,
  };

  getMessenger = () => {
    this.setState({
      loading: true,
    });
    const { name, password, password2, numberPhone } = this.state;
    if (password2 !== password) {
      Alert.alert('Mật khẩu không đúng');
      return this.setState({ password: '', password2: '', loading: false });
    }
    register(name, password).then(() =>
      Alert.alert('Thông báo', 'Đăng kí thành công', [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('Login', {
              name,
            });
            this.setState({
              loading: false,
              name: '',
              password: '',
              password2: '',
              numberPhone: '',
            });
          },
        },
      ]),
    );
  };

  render() {
    const {
      name,
      password,
      password2,

      avatar,
      loading,
    } = this.state;
    return (
      <LinearGradient
        colors={['#42a5f5', '#b3e5fc', '#fff59d']}
        style={style.contain}>
        <Text style={style.textMain}>ĐĂNG KÍ TÀI KHOẢN</Text>
        {loading && <ActivityIndicator size="large" />}
        <View style={style.box}>
          <TextInput
            placeholder="Tên đăng nhập "
            style={style.text}
            onChangeText={text => this.setState({ name: text })}
            value={name}
          />
        </View>
        <View style={style.box}>
          <TextInput
            placeholder="Mật khẩu "
            style={style.text}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry
            minLength={8}
          />
        </View>
        <View style={style.box}>
          <TextInput
            placeholder="Nhập lại mật khẩu "
            style={style.text}
            onChangeText={text => this.setState({ password2: text })}
            value={password2}
            secureTextEntry
            minLength={8}
          />
        </View>

        <Image source={{ uri: avatar }} style={{ width: 40, height: 40 }} />

        <TouchableOpacity onPress={() => this.getMessenger()}>
          <LinearGradient colors={['#bee6f7', '#faf5ca']} style={style.buttom}>
            <Text style={style.textbuttom}>Đăng kí</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const style = StyleSheet.create({
  contain: {
    // backgroundColor: '#90caf9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMain: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    bottom: 50,
  },
  box: {
    height: 50,
    width: 300,
    backgroundColor: '#e3f2fd',
    margin: 20,
    borderRadius: 10,
    padding: 5,
  },
  box1: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  textUnderline: {
    fontSize: 18,
    margin: 12,
    padding: 10,
    textDecorationLine: 'underline',
  },
  textbuttom: {
    fontSize: 30,
    color: '#757575',
    fontWeight: 'bold',
  },
  buttom: {
    top: 40,
    padding: 15,
    borderRadius: 10,
    color: '#757575',
    fontWeight: 'bold',
    borderBottomColor: '#ffe082',
    borderBottomWidth: 3,
    borderRightWidth: 2,
    borderRightColor: '#ffcc80',
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 30,
  },
});
