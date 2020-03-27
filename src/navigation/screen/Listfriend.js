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
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import Actionaccount from '../../action/action';
import LinearGradient from 'react-native-linear-gradient';
import { addFriend } from '../../api/AddFriend';
import { getListFriend, off } from '../../api/Listfriend';
import { checkProfile } from '../../api/updateProfile';
import { menuR } from '../../components/menu';
import renderItem from '../../components/listfirend';
import header from '../../components/header';
import { Icon, SearchBar } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';

const DATA = [{ displayName: 'anhdo', name: 'andho@gmail' }];

class ListFriend extends Component {
  state = {
    search: '',
    loading: true,
    arar: [],
    data: [],
    avatar: '',
    menu: false,

    index: 0,
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
    /* lấy list bạn bè */
    getListFriend(uid, friend => {
      this.setState(prev => ({ data: [...prev.data, friend], loading: false }));
    });

    this.setState({ loading: false });

    /* lấy của profile user */
    const getProfile = await checkProfile(this.props.user.uid);

    /* set profile vao reducer */

    this.props.takeProfile({ profile: getProfile });

    this.setState({ avatar: getProfile.avatar });
  };

  iconSearch = search => {
    if (search != '') {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Icon
            reverse
            reverseColor="black"
            name="clear"
            color="#e0e0e0"
            onPress={() => this.setState({ search: '' })}
            size={15}
          />
        </View>
      );
    }
    return (
      <Icon
        reverse
        reverseColor="black"
        name="search"
        color="#e0e0e0"
        onPress={() => console.log('hello')}
        size={15}
      />
    );
  };

  iconAdd = search => {
    if (search != '') {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Icon
            reverse
            reverseColor="black"
            name="user-plus"
            type="font-awesome"
            color="#e0e0e0"
            onPress={this.getSearch}
            size={15}
          />
        </View>
      );
    }
  };

  FirstRoute = () => {
    return (
      <FlatList
        data={this.state.data}
        extraData={this.state.data}
        keyExtractor={(item, index) => item.key}
        renderItem={({ item }) => renderItem({ item }, this.props.navigation)}
      />
    );
  };

  SecondRoute = () => {
    const { displayName, phoneNumber } = this.props.profile;
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 5 }}>
          <Text style={{ fontSize: 40, marginBottom: '2%' }}>
            Tên: {displayName}
          </Text>
          <Text style={{ fontSize: 40 }}>Tên: {phoneNumber}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={seclect.buttom}
            onPress={() =>  this.props.navigation.navigate('UpdateProfile')}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
              Cập nhật thông tin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return this.FirstRoute();
      case 'second':
        return this.SecondRoute();
      default:
        return null;
    }
  };

  _setItem = (index: number) =>
    this.setState({
      index,
    });

  render() {
    const { search, loading, data, avatar, index } = this.state;

    // const routes = [
    //   { key: 'first', title: 'First' },
    //   { key: 'second', title: 'Second' },
    // ];

    const navigationState = {
      index,
      routes: [
        { key: 'first', title: 'Bạn bè' },
        { key: 'second', title: 'Thông tin cá nhân' },
      ],
    };

    const initialLayout = {
      height: 0,
      width: Dimensions.get('window').width,
    };
    return (
      <View style={seclect.main}>
        <View style={seclect.box1}>
          {header.listfriendHeader(avatar, 'Chat', this.props.navigation)}
          <View
            style={{
              width: '100%',
              height: '60%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={seclect.text}>Thêm bạn</Text>
            <View style={seclect.input}>
              {this.iconSearch(search)}
              <TextInput
                placeholder="Bạn muốn mua gì?"
                onChangeText={search => this.setState({ search })}
                style={{ width: '72%' }}
                value={search}
              />
              {this.iconAdd(search)}
            </View>
          </View>
        </View>

        <LinearGradient
          colors={['#e0e0e0', '#eeeeee']}
          style={seclect.box2}>
          {loading ? <ActivityIndicator size="large" /> : null}

          <TabView
            navigationState={navigationState}
            renderScene={this._renderScene}
            onIndexChange={this._setItem}
            initialLayout={initialLayout}
          />
        </LinearGradient>
      </View>
    );
  }
  componentWillUnmount() {
    off(this.props.user.uid);
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
    flex: 3,
    backgroundColor: '#42a5f5',
  },
  box2: {
    flex: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
  },

  main: {
    flex: 1,
    backgroundColor: '#a1887f',
  },

  input: {
    width: '90%',
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    borderRadius: 10,
  },

  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    margin: 20,
    backgroundColor: '#d7ccc8',
    borderRadius: 10,
    borderBottomColor: '#8a8a8a',
    borderBottomWidth: 4,
  },
  boxButtom: {
    flex: 1,
  },
  buttom: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#207ec9',
  },
});
