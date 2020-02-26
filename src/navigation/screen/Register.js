import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class Register extends Component {
  state = {
    name: '',
    password: '',
    password2: '',
    numberPhone: 0,
  };
  getMessenger = () => {
    const {name, password, password2} = this.state;
    if (password2 !== password) {
      Alert.alert('Mật khẩu không đúng');
      return this.setState({password: '', password2: ''});
    }
  };
  render() {
    const {name, password, password2, numberPhone} = this.state;
    return (
      <LinearGradient
        colors={['#42a5f5', '#b3e5fc', '#fff59d']}
        style={style.contain}>
        <Text style={style.textMain}>Register</Text>
        <View style={style.box}>
          <TextInput
            placeholder="Tên đăng nhập "
            style={style.text}
            onChangeText={text => this.setState({name: text})}
            value={name}
          />
        </View>

        <View style={style.box}>
          <TextInput
            placeholder="Mật khẩu "
            style={style.text}
            onChangeText={text => this.setState({password: text})}
            value={password}
            secureTextEntry
            minLength={8}
          />
        </View>

        <View style={style.box}>
          <TextInput
            placeholder="Nhập lại mật khẩu "
            style={style.text}
            onChangeText={text => this.setState({password2: text})}
            value={password2}
            secureTextEntry
            minLength={8}
          />
        </View>

        <View style={style.box}>
          <TextInput
            placeholder="Số điện thoại"
            style={style.text}
            onChangeText={text => this.setState({numberPhone: text})}
            value={numberPhone}
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity onPress={() => this.getMessenger()}>
          <LinearGradient colors={['#bee6f7', '#faf5ca']} style={style.buttom}>
            <Text style={style.textbuttom}>Register</Text>
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
