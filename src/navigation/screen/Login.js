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
} from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import facebook from '../../asset/facebook.png';
import google from '../../asset/google.png';
import twitter from '../../asset/twitter.png';
import Actionaccount from '../../action/action';
import { login } from '../../api/Users';
import { checkProfile } from '../../api/updateProfile';
import moreLogin from '../../api/login';

class Login extends Component {
  static hiddenLogin = {
    headerShown: false,
  };

  state = {
    loading: false,

    password: '',
  };

  componentDidMount() {
    if (this.props.route.params?.name) {
      this.setState({ email: this.props.route.params?.name });
      console.log('Didmount', this.state.email);
    }
  }

  getLogin = async () => {
    const { email, password } = this.state;

    try {
      this.setState({ loading: true });

      if (email === '' || password === '') {
        this.setState({ loading: false });
        return Alert.alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      } else {
        let fetchedUser = await login(email, password);

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

  onPressfacebook = async () => {
    try {
      this.setState({ loading: true });

      let fetchedUser = await moreLogin.LoginwithFacebooks();

      this.props.takeUser({ user: fetchedUser });

      Alert.alert('Thông báo', 'Đăng nhập thành công', [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('Listfriend', {
              userFacebook: fetchedUser,
            });
            this.setState({ loading: false });
          },
        },
      ]);
    } catch (error) {
      console.log('==========onPressfacebook==========');
      console.log(error);
      console.log('====================================');
      this.setState({ loading: false });
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
          <TouchableOpacity onPress={this.onPressfacebook}>
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
        <TouchableOpacity onPress={this.getLogin} style={style.buttom}>
          <Text style={style.textbuttom}>Login</Text>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

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
    width: '80%',
    height: '10%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  textUnderline: {
    fontSize: 18,
    marginHorizontal: '5%',
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
    marginHorizontal: 20,
  },
});
