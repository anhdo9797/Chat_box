import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';

import Actionaccount from '../../action/action';
import LinearGradient from 'react-native-linear-gradient';
import {getUIDfriend, addChatroom} from '../../api/Chatroom';

class ChatBox extends Component {
  state = {
    messenger: '',
    showMessenger: '',
    friend: this.props.route.params.name,
    getMessage: [],
    uidFriend: '',
  };

  componentDidMount() {
    // this.getMess();
    this.getChatRoom();
  }

  getChatRoom = async () => {
    const {uid} = this.props.user;
    const getUID = await getUIDfriend(this.state.friend);
    this.setState({uidFriend: getUID});
    console.log('uidFriend==', this.state.uidFriend);
    await addChatroom(
      this.getNameRoom(this.state.uidFriend),
      uid,
      this.state.uidFriend,
    );
  };

  getNameRoom = uidFriend => {
    const {uid} = this.props.user;
    if (uidFriend > uid) {
      return uid + '_' + uidFriend;
    }
    if (uidFriend < uid) return uidFriend + '_' + uid;
    return uidFriend + '_' + uid;
  };

  render() {
    const {messenger, showMessenger, friend} = this.state;
    return (
      <View style={seclect.main}>
        <View style={seclect.box1}>
          <View style={seclect.textMain}>
            <Text style={seclect.textButtom}> {friend}</Text>
          </View>
        </View>

        <LinearGradient
          colors={['#e0e0e0', '#eeeeee', '#636161']}
          style={seclect.box2}></LinearGradient>

        <View style={seclect.box3}>
          <View style={seclect.input}>
            <TextInput
              style={{width: 250}}
              placeholder="Nhập tin nhắn"
              onChangeText={text => this.setState({messenger: text})}
              value={messenger}
            />

            <TouchableOpacity onPress={() => this.sendMessenger()}>
              <Text style={seclect.text}>Gửi</Text>
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);

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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  textMessenger: {
    fontSize: 23,
    margin: 10,
    backgroundColor: '#81d4fa',
    borderRadius: 5,
  },
});
