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
import pickAndUpload, {
  uploadImage,
  pickImageFromDevice,
} from '../../api/upload';
import { updateProfile } from '../../api/updateProfile';

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
      } else if (response.error) {
      } else if (response.customButton) {
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

  // upLoadImage = async () => {
  //   try {
  //     this.setState({ loading: true });

  //     const source = await pickImageFromDevice();
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ loading: false });
  //   }

  //   this.setState({
  //     avatar: { uri: 'data:image/jpeg;base64,' + source.data },
  //     loading: false,
  //   });
  // };

  // avatar = () => {
  //   if (this.state.loading == true) {
  //     return <ActivityIndicator size="large" />;
  //   }
  //   return (

  //   );
  // };

  message = () => {
    Alert.alert('Vui lòng nhập đủ thông tin');
  };

  done = () => {
    const { name, avatarSource, phoneNumber } = this.state;
    if (name !== '' && avatarSource !== '' && phoneNumber !== '') {
      return (
        <LinearGradient
          colors={['#ede06f', '#d1ca8c']}
          style={{ borderRadius: 10, margin: 20, borderBottomWidth: 2 }}>
          <TouchableOpacity onPress={this.getDone}>
            <Text style={[style.text, { margin: 10 }]}>Hoàn thành</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    } else
      return (
        <LinearGradient
          colors={['#f5f2dc', '#faf8ed']}
          style={{ borderRadius: 10, margin: 20, borderBottomWidth: 2 }}>
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

  render() {
    return (
      <LinearGradient
        colors={['#42a5f5', '#b3e5fc', '#fff59d']}
        style={style.contain}>
        <Text style={style.textMain}>Cập nhật thông tin tài khoản</Text>

        {this.state.loading ? <ActivityIndicator size="large" /> : null}
        <View
          style={{
            width: '40%',
            height: '20%',
            borderRadius: 20,
            borderWidth: 1,
            justifyContent: 'center',
          }}>
          <Image
            source={this.state.avatarSource}
            style={{ flex: 1, borderRadius: 20 }}
          />
        </View>
        <LinearGradient
          colors={['#48a1e8', '#66b1ed']}
          style={{ borderRadius: 10, margin: 20 }}>
          <TouchableOpacity onPress={this.picker}>
            <Text style={[style.text, { margin: 10 }]}>Chọn ảnh đại diện</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={style.box}>
          <Text style={style.text}>Tên:</Text>
          <TextInput
            placeholder="........................................................"
            style={style.textInput}
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
          />
        </View>
        <View style={style.box}>
          <Text style={style.text}>Số điện thoại:</Text>
          <TextInput
            placeholder="........................................................"
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
    fontSize: 25,
  },
  textInput: {
    fontSize: 25,
    paddingLeft: 10,
  },
  box: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    margin: 20,
  },
});
