import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export async function updateProfile(uid, displayName, avatar, phoneNumber) {
  try {

    const ref = database().ref(`/users/${uid}/profile`);
    await ref.set({ displayName, avatar, phoneNumber });
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
    .ref(`/users/${uid}/profile`)
    .once('value');

  const fetchProfile = snapshot.val();

  return fetchProfile;
};
