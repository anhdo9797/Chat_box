import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import Actionaccount from '../../action/action';
import LinearGradient from 'react-native-linear-gradient';
import {addFriend} from '../../api/AddFriend';
import {listFriend} from '../../api/Listfriend';

class ListFriend extends Component {
  state = {
    search: '',
    loading: false,
    arar: [],
    data: [],
  };

  getSearch = () => {
    const {user} = this.props;
    const {search, loading} = this.state;
    console.log(user);
    this.setState({loading: true});
    const {uid} = this.props.user;
    addFriend(uid, search)
      .then(() => Alert.alert('them thành công'))
      .then(() => this.setState({loading: false, search: ''}))
      .catch(e => Alert.alert(e.message));
  };

  async getData() {
    const {uid} = this.props.user;
    const ary = await listFriend(uid);
    console.log('data===== ', Promise.all(ary));

    return Promise.all(ary);
  }

  render() {
    const {email, uid} = this.props.user;
    const {search, loading} = this.state;

    return (
      <View style={seclect.main}>
        <View style={seclect.box1}>
          <View style={seclect.textMain}>
            <Text style={seclect.textButtom}>Xin chào: {email}</Text>
          </View>
          <View style={seclect.input}>
            <TextInput
              style={{width: 250}}
              placeholder="Nhập tên bạn muốn thêm"
              onChangeText={text => this.setState({search: text})}
              value={search}
            />

            <TouchableOpacity onPress={() => this.getSearch()}>
              <Text style={seclect.text}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={['#e0e0e0', '#eeeeee', '#636161']}
          style={seclect.box2}>
          {loading ? <ActivityIndicator size="large" /> : null}

          <FlatList
            data={this.getData()}
            renderItem={item => {
              <View>
                <Text>{item.name}</Text>
              </View>;
            }}
          />
        </LinearGradient>

        <View style={seclect.box3}>
          <TouchableOpacity>
            <Text style={seclect.textButtom}>Lịch sử</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getData()}>
            <Text style={seclect.textButtom}>Thêm bạn</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
});

const mapDispatchToProps = {
  takeUser: Actionaccount.takeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFriend);

const seclect = StyleSheet.create({
  box1: {
    flex: 2,
    backgroundColor: '#757575',
    borderBottomWidth: 4,
    borderBottomColor: '#a1887f',
    borderBottomEndRadius: 70,
    borderTopColor: 'red',
  },
  box2: {
    flex: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  box3: {
    flex: 1,
    backgroundColor: '#424242',
    borderTopStartRadius: 70,
    borderTopColor: '#a1887f',
    borderTopWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: '#a1887f',
  },
  textButtom: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    flex: 1,
    width: 350,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    bottom: 10,
    // marginRight: 40,
    marginHorizontal: 5,
    // borderBottomEndRadius: 70,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  textMain: {
    flex: 2,
    top: 30,
  },
  image: {
    width: 20,
    height: 20,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 30,
    backgroundColor: 150,
    padding: 5,
    borderRadius: 10,
  },
});
