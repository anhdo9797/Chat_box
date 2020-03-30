import database from '@react-native-firebase/database';

export async function addFriend(uid, email = '') {
  try {
    //biến kiểm tra cái email truyền vào có trong user của database hay ko?

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

    //nếu chưa có email thì thêm email nhập vào danh sách bạn bè

    const isExisted = checkMail.val() !== null;
    if (isExisted && checkFriend.val() === null) {
      await database()
        .ref(`/users/${uid}/friend`)
        .push({ email });
    } else {
      //nếu có rồi thì báo lỗi
      throw Error('Email không tồn tại, hoặc đã kết bạn trước đó');
    }
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
}
