import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export async function updateProfile(uid, displayName, avatar, phoneNumber) {
  try {
    // database()
    //   .ref(`/users/${uid}/friend`)
    //   .push({ email });
    const ref = database().ref(`/users/${uid}/profile`);
    await ref.push({ displayName, avatar, phoneNumber });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const checkProfile = async uid => {
  const snapshot = await database()
    .ref(`/users/${uid}/profile`)
    .once('value');

  const checkPro = snapshot.val();

  return checkPro;
};

export const getProFile = async (uid, profileID) => {
  const snapshot = await database()
    .ref(`/users/${uid}/profile/${profileID}`)
    .once('value');

  const fetchProfile = snapshot.val();

  return fetchProfile;
};
