import database from '@react-native-firebase/database';
import { checkProfile } from './updateProfile';
import { getUIDfriend } from './Chatroom';

export const getListFriend = async (uid, callback = () => {}) => {
  try {
    database()
      .ref(`/users/${uid}/friend`)
      .on('child_added', async snapshot => {
        const friend = await parse(snapshot);
        callback(friend);
      });
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
};

const parse = async snapshot => {
  const profile = await getProfileFriend(snapshot.val().email);

  const result = {
    displayName: profile.displayName,
    avatar: profile.avatar,
    phoneNumber: profile.phoneNumber,
    name: snapshot.val().email,
    key: snapshot.key,
  };

  return result;
};

export const getProfileFriend = async email => {
  /*lấy profile(avatar, displayName) của bạn bè  */
  const uid = await getUIDfriend(email);
  const profile = await checkProfile(uid);
  console.log('profile', profile);

  return profile;
};

export const off = uid => {
  database()
    .ref(`/users/${uid}/friend`)
    .off('child_added');
};
