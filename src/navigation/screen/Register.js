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

export default class Register extends Component {
  state = {
    name: '',
    password: '',
    password2: '',
    avatar: '',
    loading: false,
  };

  getMessenger = () => {
    this.setState({
      loading: true,
    });
    const { name, password, password2 } = this.state;

    if (password2 !== password) {
      Alert.alert('Đăng kí không thành công', 'Mật khẩu không đúng');
      return this.setState({ password: '', password2: '', loading: false });
    }

    register(name, password)
      .then(() =>
        Alert.alert('Đăng kí thành công', 'nhấn ok để đăng nhập', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('Login', {
               name,
              });
              this.setState({
                loading: false,
                password: '',
                password2: '',
              });
            },
          },
        ]),
      )
      .catch(() => {
        Alert.alert(
          'Đăng kí không thành công',
          'Vui lòng kiểm tra lại địa chỉ Email',
          [
            {
              text: 'OK',
              onPress: () => {
                this.setState({ loading: false, password: '', password2: '' });
              },
            },
          ],
        );
      });
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

        <TouchableOpacity
          onPress={() => this.getMessenger()}
          style={style.buttom}>
          <Text style={style.textbuttom}>Đăng kí</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    bottom: '10%',
  },
  box: {
    height: 50,
    width: '77%',
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 5,
    margin: 20,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  textUnderline: {
    fontSize: 18,
    margin: '6%',
    padding: 10,
    textDecorationLine: 'underline',
  },
  textbuttom: {
    fontSize: 30,
    color: '#757575',
    fontWeight: 'bold',
  },
  buttom: {
    top: '10%',
    borderRadius: 10,
    color: '#757575',
    fontWeight: 'bold',
    borderBottomColor: '#ffe082',
    borderBottomWidth: 3,
    borderRightWidth: 2,
    borderRightColor: '#ffcc80',
    width: '30%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffacf',
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: '5%',
  },
});
