import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ActivityIndicatorBase,
} from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import facebook from '../../asset/facebook.png';
import google from '../../asset/google.png';
import twitter from '../../asset/twitter.png';
import Actionaccount from '../../action/action';
import { login } from '../../api/Users';
import { checkProfile, getProFile } from '../../api/updateProfile';

class Login extends Component {
  static hiddenLogin = {
    headerShown: false,
  };

  state = {
    email: 'Anhdo97@gmail.com',
    password: '123123',
    loading: false,
  };

  getLogin = async () => {
    const { email, password, loading } = this.state;

    try {
      this.setState({ loading: true });

      if (email === '' || password === '') {
        return Alert.alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      } else {
        const fetchedUser = await login(email, password);

        this.setState({ loading: false });
        this.props.takeUser({ user: fetchedUser });

        const checkPro = await checkProfile(this.props.user.uid);

        if (checkPro != null) {
          return Alert.alert('Thông báo', 'Đăng nhập thành công', [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('Listfriend'),
            },
          ]);
        }
        if (checkPro == null) {
          return Alert.alert('Thông báo', 'Vui lòng cập nhật thông tin', [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('UpdateProfile'),
            },
          ]);
        }
      }
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert('Thông báo', 'Đăng nhập thất bại', [{ text: 'OK' }]);
      console.log(error);
    }
  };

  render() {
    const { email, password, loading } = this.state;
    return (
      <LinearGradient
        colors={['#42a5f5', '#b3e5fc', '#fff59d']}
        style={style.contain}>
        <Text style={style.textMain}>Login</Text>
        {loading && <ActivityIndicator size="large" />}
        <View style={style.box}>
          <TextInput
            placeholder="Email "
            style={style.text}
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
        </View>
        <View style={style.box}>
          <TextInput
            placeholder="Password "
            style={style.text}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry
            minLength={6}
          />
        </View>
        <View style={style.box1}>
          <TouchableOpacity>
            <Image source={facebook} style={style.image} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={twitter} style={style.image} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={google} style={style.image} />
          </TouchableOpacity>
        </View>
        <View style={style.box1}>
          <TouchableOpacity>
            <Text style={style.textUnderline}>Forgot password ? </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={style.textUnderline}>Register </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.getLogin}>
          <LinearGradient colors={['#bee6f7', '#faf5ca']} style={style.buttom}>
            <Text style={style.textbuttom}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
  profile: state.account.profile,
});

const mapDispatchToProps = {
  takeUser: Actionaccount.takeUser,
  takeProfile: Actionaccount.takeProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
