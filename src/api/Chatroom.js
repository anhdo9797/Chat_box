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
    console.log('uid=====', uid);
    return uid;
  } catch (e) {
    console.log('=== ADDCHATBOX error: ', e);
    throw e;
  }
}

export const addChatroom = async (nameRoom, uid1, uid2) => {
  try {
    const checkNameroom = await database()
      .ref('Chat_room')
      .orderByChild('name')
      .equalTo(nameRoom)
      .once('value');

    if (checkNameroom.val() === null) {
      await database()
        .ref('Chat_room')
        .push({
          name: nameRoom,
          member: {
            uid1,
            uid2,
          },
        });
    }
  } catch (error) {
    console.log(error);
  }
};
