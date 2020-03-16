import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { Component } from 'react';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Avatar extends Component {
  state = { avatarSource: '' };

  imageLibrary = () => {
    const { avatarSource } = this.state;
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
        console.log('source===', avatarSource);
        this.uploadImage(avatarSource);
      }
    });
  };

  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage().ref('avatar');
      const task = ref.put(blob);

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
            /* noop but you can track the progress here */
          },
          reject /* this is where you would put an error callback! */,
          () => resolve(task.snapshot.downloadURL),
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  };
}

const upAvatar = new Avatar();

export default upAvatar;
