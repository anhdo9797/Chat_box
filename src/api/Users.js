import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export async function register(email, password) {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    const uid = auth().currentUser.uid;
    const ref = database().ref(`/users/${uid}`);
    await ref.set({uid, email, password});
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function login(email, password) {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    const uid = auth().currentUser.uid;
    const ref = database().ref(`/users/${uid}`);
    const snapshot = await ref.once('value');
    const user = snapshot.val();
    return user;
  } catch (e) {
    throw e;
  }
}
