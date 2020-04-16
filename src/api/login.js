import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

async function LoginwithFacebooks() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const loginFacebooks = await (await auth().signInWithCredential(
    facebookCredential,
  )).user;

  const loginFac = await (await auth().signInWithCredential(facebookCredential))
    .user;

  console.log('loginFac', loginFac);

  const userFacebook = {
    avatartURL: loginFacebooks.photoURL,
    displayName: loginFacebooks.displayName,
    phoneNumber: loginFacebooks.phoneNumber,
    email: loginFacebooks.email,
  };

  console.log('userFacebook', userFacebook);

  // Sign-in the user with the credential
  return userFacebook;
}

const moreLogin = {
  LoginwithFacebooks,
};

export default moreLogin;
