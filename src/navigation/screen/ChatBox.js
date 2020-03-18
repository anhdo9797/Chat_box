import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

import Actionaccount from '../../action/action';
import { getUIDfriend, addChatroom } from '../../api/Chatroom';
import {
  sendMessage,
  onMesssageUpdated,
  offMesssageUpdated,
} from '../../api/chat';

import { onLogout } from '../../api/Users';
import { menuR } from '../../components/menu';

class ChatBox extends Component {
  state = {
    messenger: [],
    friend: this.props.route.params.name,
    getMessage: [],
    uidFriend: '',
    menu: false,
  };

  componentDidMount() {
    this.getChatRoom();
  }

  getChatRoom = async () => {
    const { uid } = this.props.user;
    const uidFriend = await getUIDfriend(this.state.friend);
    this.setState({ uidFriend });

    let roomName = this.getNameRoom(uidFriend);
    await addChatroom(roomName, uid, uidFriend);

    onMesssageUpdated(roomName, message => {
      this.setState(prev => ({
        messenger: GiftedChat.append(prev.messenger, [message]),
      }));
    });
  };

  getNameRoom = uidFriend => {
    const { uid } = this.props.user;
    if (uidFriend > uid) {
      return uid + '_' + uidFriend;
    }
    return uidFriend + '_' + uid;
  };

  sendMessages = messages => {
    sendMessage(this.getNameRoom(this.state.uidFriend), messages);
  };

  render() {
    const { uid } = this.props.user;
    const { menu } = this.state;
    const { avatar, displayName } = this.props.profile;

    return (
      <View style={seclect.main}>
        <View style={seclect.box1}>
          <Image
            source={{ uri: this.props.route.params.avatar }}
            style={{
              width: '15%',
              height: '60%',
              margin: 10,
              borderRadius: 50,
            }}
          />
          <View>
            <Text style={seclect.textButtom}>
              {this.props.route.params.displayName}
            </Text>
            <Text style={seclect.text}>{this.props.route.params.name}</Text>
          </View>

          <TouchableOpacity
            style={{ marginLeft: '30%', marginTop: '6%' }}
            onPress={() => this.setState({ menu: !menu })}>
            <Image
              source={require('../../asset/menu.png')}
              style={{ width: 20, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        {menu ? menuR(this.props.navigation) : null}
        <View style={{ flex: 6 }}>
          <GiftedChat
            messages={this.state.messenger}
            onSend={this.sendMessages}
            user={{
              _id: uid,
              name: displayName,
              avatar,
            }}
          />
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    offMesssageUpdated(this.getNameRoom(this.state.uidFriend));
  }
}

const mapStateToProps = state => ({
  user: state.account.user,

  profile: state.account.profile,
});

const mapDispatchToProps = {
  takeUser: Actionaccount.takeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);

const seclect = StyleSheet.create({
  box1: {
    backgroundColor: '#757575',
    borderBottomWidth: 4,
    borderBottomColor: '#a1887f',
    borderBottomEndRadius: 70,
    borderTopColor: 'red',
    flexDirection: 'row',
    flex: 1,
  },

  main: {
    flex: 1,
    backgroundColor: '#a1887f',
  },
  textButtom: {
    fontSize: 20,
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
    top: 30,
    flexDirection: 'row',
    flex: 1,
  },

  text: {
    fontSize: 15,
    backgroundColor: 10,
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
