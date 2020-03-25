import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export async function getUIDfriend(email = '') {
  try {
    const snapshot = await database()
      .ref('users')
      .orderByChild('email')
      .equalTo(email)
      .once('value');
    const uid = Object.keys(snapshot.val())[0];
    return uid;
  } catch (e) {
    console.log('=== ADDCHATBOX error: ', e);
    throw e;
  }
}

export const addChatroom = async (nameRoom, uid1, uid2) => {
  try {
    const checkRoom = await database()
      .ref('chatroom')
      .child(nameRoom)
      .once('value');

    if (checkRoom.val() === null)
      await database()
        .ref('chatroom')
        .child(nameRoom)
        .child('member')
        .push({
          [uid1]: true,
          [uid2]: true,
        });
  } catch (error) {
    console.log(error);
  }
};
