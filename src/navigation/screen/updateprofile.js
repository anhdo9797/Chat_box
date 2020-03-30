import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Input, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

import Actionaccount from '../../action/action';
import { uploadImage } from '../../api/upload';
import { updateProfile } from '../../api/updateProfile';
import avatar from '../../asset/ava.png';
import dateComponenst from '../../components/date';

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
    birthday: '',
    sex: '',
  };

  componentDidMount() {
    var today = new Date();

    var birthday =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();

    this.setState({ birthday });
  }

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
    Alert.alert(
      'Vui lòng nhập đủ thông tin',
      'Nhấn vào biểu tượng avatar để chọn ảnh và nhập đủ thông tin trên màn hình.',
    );
  };

  buttomDone = () => {
    const { name, avatarSource, phoneNumber, sex } = this.state;
    if (name !== '' && avatarSource !== '' && phoneNumber !== '' && sex != '') {
      return (
        <TouchableOpacity
          style={[style.buttom, { backgroundColor: '#207ec9' }]}
          onPress={this.getDone}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>
            Hoàn thành
          </Text>
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity style={style.buttom} onPress={this.message}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>
            Hoàn thành
          </Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={this.picker}>
          <Avatar
            rounded
            source={this.state.avatarSource}
            size="xlarge"
            activeOpacity={0.7}
            icon={{ name: 'user', type: 'font-awesome' }}
          />
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity onPress={this.picker}>
        <Avatar
          rounded
          source={avatar}
          size="xlarge"
          activeOpacity={0.7}
          icon={{ name: 'user', type: 'font-awesome' }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const buttons = ['Giới tính', 'Nam', 'Nữ'];
    const { name, phoneNumber, birthday, sex } = this.state;

    return (
      <LinearGradient
        colors={['#42a5f5', '#b3e5fc', '#fff59d']}
        style={style.contain}>
        <View style={{ backgroundColor: 100, flex: 1 }}>
          <View style={style.boxAvatar}>
            {this.getAvatar()}

            {this.state.loading ? <ActivityIndicator size="large" /> : null}

            {this.buttomDone()}
          </View>

          <View style={style.boxInput}>
            <Input
              containerStyle={style.input}
              placeholder="Tên:"
              onChangeText={text => this.setState({ name: text })}
              value={name}
              inputContainerStyle={{
                borderColor: '#e0e0e0',
                borderBottomWidth: 3,
              }}
              inputStyle={{ fontSize: 23, fontStyle: 'italic', color: 'white' }}
            />

            <Input
              containerStyle={style.input}
              placeholder="Số điện thoại:"
              onChangeText={text => this.setState({ phoneNumber: text })}
              value={phoneNumber}
              keyboardType="number-pad"
              inputContainerStyle={{
                borderColor: '#e0e0e0',
                borderBottomWidth: 3,
              }}
              inputStyle={{ fontSize: 23, fontStyle: 'italic', color: 'white' }}
            />
            <View style={[style.input,{flexDirection: 'row' }]}>
            <Text style={{fontSize: 25, color: 'white',marginLeft: '2%'}}>Ngày sinh:  </Text>
              {dateComponenst(birthday, date => {
                this.setState({
                  birthday: date,
                });
              })}
            </View>

           
            <ButtonGroup
              onPress={sex => this.setState({ sex })}
              selectedIndex={sex}
              buttons={buttons}
              containerStyle={[style.input, { backgroundColor: '#616161' }]}
              textStyle={{ fontSize: 25, color: 'white' }}
            />
          </View>
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
  },
  boxAvatar: {
    backgroundColor: 50,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    marginHorizontal: '2%',
  },
  boxInput: {
    backgroundColor: '#616161',
    flex: 3,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: '7%',
    marginHorizontal: '2%',
    opacity: 0.8,
  },
  boxButtom: {
    backgroundColor: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontStyle: 'italic',
  },
  input: {
    height: '15%',
    marginTop: '8%',
  },
  buttom: {
    width: '80%',
    height: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1d598a',
    marginTop: '8%',
    borderRadius: 30,
  },
});
