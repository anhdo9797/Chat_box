import database from '@react-native-firebase/database';

export async function listFriend(uid) {
  // const {
  //   data: [],
  // } = this.state;
  try {
    const array = [];
    await database()
      .ref(`/users/${uid}/friend`)
      .on('child_added', snapshot => {
        array.push({
          name: snapshot.val().email,
          key: snapshot.key,
        });
      });
    // await this.setState({data: array});
    console.log('===array', array);
    // await array;
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
}
