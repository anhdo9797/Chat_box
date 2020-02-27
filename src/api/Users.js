import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';

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

    console.log('=== LOGIN: ', user);
    return user;
  } catch (e) {
    console.log('=== LOGIN: ', e);

    throw e;
  }
}
