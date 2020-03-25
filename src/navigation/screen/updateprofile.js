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

import ImagePicker from 'react-native-image-picker';

import LinearGradient from 'react-native-linear-gradient';

import Actionaccount from '../../action/action';
import { uploadImage } from '../../api/upload';
import { updateProfile } from '../../api/updateProfile';
import avatar from '../../asset/ava.png';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class UpdateProfile extends Component {
  state = {
    name: '',
    avatarSource: '',
    phoneNumber: '',
    loading: false,
    response: '',
  };

  picker = () => {
    ImagePicker.showImagePicker(options, response => {
      this.setState({
        loading: true,
      });
      if (response.didCancel) {
        this.setState({ loading: false });
      } else if (response.error) {
        this.setState({ loading: false });
      } else if (response.customButton) {
        this.setState({ loading: false });
      } else {
        const source = { uri: response.uri };

        this.setState({
          avatarSource: source,
          loading: false,
          response,
        });
      }
    });
  };

  message = () => {
    Alert.alert('Vui lòng nhập đủ thông tin');
  };

  done = () => {
    const { name, avatarSource, phoneNumber } = this.state;
    if (name !== '' && avatarSource !== '' && phoneNumber !== '') {
      return (
        <LinearGradient
          colors={['#ede06f', '#d1ca8c']}
          style={{ borderRadius: 10, margin: '10%', borderBottomWidth: 2 }}>
          <TouchableOpacity onPress={this.getDone}>
            <Text style={[style.text, { margin: 10 }]}>Hoàn thành</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    } else
      return (
        <LinearGradient
          colors={['#f5f2dc', '#faf8ed']}
          style={{ borderRadius: 10, margin: '10%', borderBottomWidth: 2 }}>
          <TouchableOpacity onPress={this.message}>
            <Text style={[style.text, { margin: 10 }]}>Hoàn thành</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
  };

  getDone = async () => {
    try {
      const { response, name, phoneNumber, loading } = this.state;
      const { uid } = this.props.user;

      this.setState({ loading: true });

      const avatar = await uploadImage(
        response.path,
        response.data,
        response.fileName,
      );

      console.log('uid', uid);

      await updateProfile(uid, name, avatar, phoneNumber);

      this.setState({ loading: false });
      this.props.navigation.navigate('Listfriend');
    } catch (error) {
      console.log(error);

      this.setState({ loading: false });
    }
  };

  getAvatar = () => {
    if (this.state.avatarSource != '')
      return (
        <Image
          source={this.state.avatarSource}
          style={{ flex: 1, borderRadius: 20 }}
        />
      );
    return (
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Image source={avatar} style={{ width: 100, height: 100 }} />
        <Text style={{ fontSize: 20, color: 'white', margin: 10 }}>
          chọn ảnh
        </Text>
      </View>
    );
  };

  render() {
    return (
      <LinearGradient
        colors={['#42a5f5', '#b3e5fc', '#fff59d']}
        style={style.contain}>
        <Text style={style.textMain}>Cập nhật thông tin tài khoản</Text>

        {this.state.loading ? <ActivityIndicator size="large" /> : null}

        <TouchableOpacity
          onPress={this.picker}
          style={{
            width: '40%',
            height: '20%',
            borderRadius: 20,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e0e0e0',
          }}>
          {this.getAvatar()}
        </TouchableOpacity>

        <View style={style.box}>
          <Text style={style.text}>Tên:</Text>
          <TextInput
            style={style.textInput}
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
          />
        </View>
        <View style={style.box}>
          <Text style={style.text}>Số điện thoại:</Text>
          <TextInput
            style={style.textInput}
            keyboardType="number-pad"
            onChangeText={text => this.setState({ phoneNumber: text })}
            value={this.state.phoneNumber}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
          }}>
          {this.done()}
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
});

const mapDispatchToProps = {
  takeUser: Actionaccount.takeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);

const style = StyleSheet.create({
  contain: {
    // backgroundColor: '#90caf9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMain: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    bottom: 50,
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#757575',
  },
  textInput: {
    fontSize: 20,
    paddingLeft: 10,
    width: '80%',
  },
  box: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    margin: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#eeeeee',
    backgroundColor: '#c5dce6',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
