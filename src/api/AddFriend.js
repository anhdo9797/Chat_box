import database from '@react-native-firebase/database';

export async function addFriend(uid, email = '') {
  try {
    const checkMail = await database()
      .ref('users')
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    const checkFriend = await database()
      .ref(`/users/${uid}/friend`)
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    const isExisted = checkMail.val() !== null;
    if (isExisted && checkFriend.val() === null) {
      await database()
        .ref(`/users/${uid}/friend`)
        .push({email});
    } else {
      throw Error('Email không tồn tại, hoặc đã kết bạn trước đó');
    }
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
}
