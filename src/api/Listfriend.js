import database from '@react-native-firebase/database';

export async function getListFriend(uid) {
  const array = [];
  try {
    await database()
      .ref(`/users/${uid}/friend`)
      .on('child_added', snapshot => {
        array.push({
          name: snapshot.val().email,
          key: snapshot.key,
        });
      });

    return array;
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
}
