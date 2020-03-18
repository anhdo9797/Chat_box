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
import { getListFriend, off } from '../../api/Listfriend';
import { checkProfile } from '../../api/updateProfile';
import { menuR } from '../../components/menu';

const DATA = [{ displayName: 'anhdo', name: 'andho@gmail' }];

class ListFriend extends Component {
  state = {
    search: '',
    loading: true,
    arar: [],
    data: [],
    avatar: '',
    menu: false,
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

  renderItem = ({ item, index }) => (
    <LinearGradient
      colors={['#e0e0e0', '#eceff1', '#c2c4c4']}
      style={seclect.item}>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Chatbox', {
            name: item.name,
            item,
            displayName: item.displayName,
            avatar: item.avatar,
          })
        }>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View>
            <Image
              source={{ uri: item.avatar }}
              style={{ width: 50, height: 50, margin: 5, borderRadius: 25 }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 20, margin: 5 }}>{item.displayName}</Text>
            <Text style={{ fontSize: 15, margin: 5 }}>{item.name}</Text>
          </View>
        </View>
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
    const { displayName, phoneNumber } = this.props.profile;

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
              <Text style={seclect.textButtom}>{displayName}</Text>
              <Text style={seclect.textSmall}>{phoneNumber}</Text>
              <Text style={seclect.textSmall}>{this.props.user.email}</Text>
            </View>
            <TouchableOpacity
              style={{ marginRight: '5%', marginTop: '2%' }}
              onPress={() => this.setState({ menu: !this.state.menu })}>
              <Image
                source={require('../../asset/menu.png')}
                style={{ width: 20, height: 30 }}
              />
            </TouchableOpacity>
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
          {this.state.menu ? menuR(this.props.navigation) : null}
          <FlatList
            data={data}
            extraData={{ data }}
            keyExtractor={(item, index) => item.key}
            renderItem={this.renderItem}
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
    borderBottomColor: '#8a8a8a',
    borderBottomWidth: 4,
  },
});
