import database from '@react-native-firebase/database';
import { getUIDfriend } from './Chatroom';
import { checkProfile, getProFile } from './updateProfile';

const arrayBig = [];

export async function getListFriend(uid) {
  const array = [];
  const array2 = [];
  try {
    await database()
      .ref(`/users/${uid}/friend`)
      .on('child_added', snapshot => {
        console.log('snapshot', snapshot.val());
        array2.push({
          name: snapshot.val().email,
          key: snapshot.key,
        });
      });

    console.log('aray2', array2);
    console.log('aray', array);

    return array2;
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
}

const getProFileFriend = async email => {
  console.log('====start');

  const uidFriend = await getUIDfriend(email);
  console.log('uidFriend', uidFriend);

  const keyProfile = checkProfile(uidFriend);
  console.log('keyProfile', keyProfile);

  const proFilefriend = getProFile(uidFriend, Object.keys(keyProfile));
  console.log('proFilefriend', proFilefriend);

  console.log('====end');

  return proFilefriend;
};
