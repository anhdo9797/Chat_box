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
import {onMesssageUpdated, sendMessage} from '../../api/chat';

class ChatBox extends Component {
  state = {
    messenger: [],
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
    const uidFriend = await getUIDfriend(this.state.friend);
    this.setState({uidFriend});
    console.log('uidFriend==', this.state.uidFriend);
    const roomName = this.getNameRoom(uidFriend);

    await addChatroom(roomName, uid, this.state.uidFriend);

    onMesssageUpdated(roomName, message => {
      this.setState(prew => ({
        messenger: GiftedChat.append(prew.messenger, [message]),
      }));
    });
  };

  getNameRoom = uidFriend => {
    const {uid} = this.props.user;
    if (uidFriend > uid) {
      return uid + '_' + uidFriend;
    }
    if (uidFriend < uid) return uidFriend + '_' + uid;
    return uidFriend + '_' + uid;
  };

  sendMessages = messages => {
    sendMessage(this.getNameRoom(this.state.uidFriend), messages);
  };

  render() {
    const {friend} = this.state;
    const {uid, email} = this.props.user;

    return (
      <View style={seclect.main}>
        <View style={seclect.box1}>
          <View style={seclect.textMain}>
            <Text style={seclect.textButtom}> {friend}</Text>
          </View>
        </View>

        <GiftedChat
          messages={this.state.messenger}
          onSend={this.sendMessages}
          user={{
            _id: uid,
            name: email,
          }}
        />
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
    width: '100%',
    height: '10%',
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
