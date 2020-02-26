import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import Actionaccount from '../../action/action';
import LinearGradient from 'react-native-linear-gradient';

class ListFriend extends Component {
  getSearch = () => {
    const {user} = this.props;
    console.log(user);
  };
  render() {
    const {user} = this.props;
    return (
      <View style={seclect.main}>
        <View style={seclect.box1}>
          <View style={seclect.textMain}>
            <Text style={seclect.textButtom}>Xin chào: {user}</Text>
          </View>
          <View style={seclect.input}>
            <TextInput placeholder="Nhập tên bạn muốn tìm" />

            <TouchableOpacity onPress={() => this.getSearch()}>
              <Text style={seclect.text}>Tìm</Text>
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={['#e0e0e0', '#eeeeee', '#636161']}
          style={seclect.box2}></LinearGradient>

        <View style={seclect.box3}>
          <TouchableOpacity>
            <Text style={seclect.textButtom}>Lịch sử</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
