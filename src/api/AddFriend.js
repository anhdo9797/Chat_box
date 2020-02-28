import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export async function addFriend(uid, email = '') {
  try {
    const checkMail = await database()
      .ref('users')
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    const isExisted = checkMail.val() !== null;
    if (isExisted) {
      await database()
        .ref(`/users/${uid}/friend`)
        .push({email});
    } else {
      throw Error('Email không tồn tại');
    }
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
}
