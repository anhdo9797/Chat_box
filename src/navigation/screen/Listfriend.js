import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import Actionaccount from '../../action/action';
import LinearGradient from 'react-native-linear-gradient';
import { addFriend } from '../../api/AddFriend';
import { getListFriend } from '../../api/Listfriend';
import { checkProfile, getProFile } from '../../api/updateProfile';
import { getUIDfriend } from '../../api/Chatroom';

class ListFriend extends Component {
  state = {
    search: '',
    loading: true,
    arar: [],
    data: [],
    avatar: '',
  };

  componentDidMount() {
    this.getData();
  }

  getSearch = async () => {
    const { user } = this.props;
    const { search } = this.state;
    console.log(user);
    this.setState({ loading: true });
    const { uid } = this.props.user;

    try {
      await addFriend(uid, search);
      Alert.alert('thêm thành công');
      this.setState({ loading: false, search: '' });
    } catch (e) {
      Alert.alert(e.message);
      this.setState({ loading: false, search: '' });
    }
  };

  getData = async () => {
    const { uid } = this.props.user;

    /* lấy danh sách bạn bè */
    const listFriend = await getListFriend(uid);
    this.setState({ data: listFriend, loading: false });


    console.log('dataa', this.state.data);

    /* lấy key của profile user */
    const keyProfile = await checkProfile(this.props.user.uid);

    /* lấy profile user */

    const fetchProfie = await getProFile(uid, Object.keys(keyProfile));
    this.props.takeProfile({ profile: fetchProfie });

    this.setState({ avatar: fetchProfie.avatar });
  };

  renderItem = ({ item, index }) => (
    <LinearGradient
      colors={['#e0e0e0', '#a8a0a0', '#ffccbc']}
      style={seclect.item}>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Chatbox', {
            name: item.name,
            item,
          })
        }>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: '20%', height: '10%' }}
        />
        <Text style={{ fontSize: 20, margin: 13 }}>{item.displayName}</Text>

        <Text style={{ fontSize: 15, margin: 13 }}>{item.name}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  loadingAvatar = () => {
    if (this.state.avatar == '') {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <Image
          source={{ uri: this.state.avatar }}
          style={{
            flex: 1,
            borderRadius: 10,
          }}
        />
      );
    }
  };

  render() {
    const { search, loading, data } = this.state;

    return (
      <View style={seclect.main}>
        <View style={seclect.box1}>
          <View style={seclect.textMain}>
            <View
              style={{
                width: '25%',
                height: '65%',
                margin: 4,
                borderRadius: 10,
              }}>
              {this.loadingAvatar()}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={seclect.textButtom}>
                {this.props.profile.displayName}
              </Text>
              <Text style={seclect.textSmall}>
                {this.props.profile.phoneNumber}
              </Text>
              <Text style={seclect.textSmall}>{this.props.user.email}</Text>
            </View>
          </View>

          <View style={seclect.input}>
            <TextInput
              style={{ width: '80%' }}
              placeholder="Nhập tên bạn muốn thêm"
              onChangeText={text => this.setState({ search: text })}
              value={search}
            />

            <TouchableOpacity onPress={this.getSearch}>
              <Text style={seclect.text}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={['#e0e0e0', '#eeeeee', '#636161']}
          style={seclect.box2}>
          {loading ? <ActivityIndicator size="large" /> : null}
          <FlatList
            data={data}
            extraData={data}
            keyExtractor={(item, index) => item.key}
            renderItem={this.renderItem}
          />
        </LinearGradient>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListFriend);

const seclect = StyleSheet.create({
  box1: {
    flex: 1,
    backgroundColor: '#757575',
    borderBottomWidth: 4,
    borderBottomColor: '#a1887f',
    borderBottomEndRadius: 70,
    borderTopColor: 'red',
  },
  box2: {
    flex: 3,
    backgroundColor: 'blue',
    borderRadius: 10,
  },

  main: {
    flex: 1,
    backgroundColor: '#a1887f',
  },
  textButtom: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginStart: 20,
  },
  textSmall: {
    fontSize: 15,
    color: '#e0f7fa',
    marginStart: 20,
  },
  input: {
    width: '90%',

    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    bottom: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
    height: '20%',
  },
  textMain: {
    flex: 2,
    top: 30,
    flexDirection: 'row',
  },
  image: {
    width: 20,
    height: 20,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 25,
    backgroundColor: 150,
    padding: 4,
    borderRadius: 10,
  },
  item: {
    padding: 10,
    margin: 20,
    backgroundColor: '#d7ccc8',
    borderRadius: 10,
  },
});
