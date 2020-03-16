import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {View, TouchableOpacity, Text, Image, Platform} from 'react-native';

import storage from '@react-native-firebase/storage';
import upAvatar from '../../api/avatar';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const Fetch = RNFetchBlob.polyfill.Fetch;

window.fetch = new Fetch({
  auto: true,

  binaryContentTypes: ['image/', 'video/', 'audio/', 'foo/'],
}).build();

export default class Chattest extends React.Component {
  state = {
    messages: [],
    avatarSource: '',
  };

  imageLibrary = async () => {
    await ImagePicker.showImagePicker(options, response => {
      console.log('Blob = ', Blob);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.uploadImage(response.uri)
          .then(url => {
            this.setState({avatarSource: url});
          })
          .catch(e => console.log(e));
      }
    });
  };

  // uploadImageF = async uri => {
  //   console.log('got image to upload. uri:' + uri);
  //   try {
  //     const response = await fetch(uri);
  //     console.log(response);
  //     const blob = await response.blob();
  //     await storage()
  //       .ref('avatar')
  //       .put(blob);
  //   } catch (err) {
  //     console.log('uploadImage try/catch error: ' + err.message);
  //   }
  // };

  uploadImage = async (uri, mine = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sesionId = new Date().getTime();
      let upLoadBlob = null;

      const imageRef = storage()
        .ref('image')
        .child(`${sesionId}.jpg`);

      console.log('uploadUri', uploadUri);

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          console.log('blob', Blob.build(data, {type: `${mine};BASE64`}));
          return Blob.build(data, {type: `${mine};BASE64`});
        })
        .then(blob => {
          upLoadBlob = blob;
          return imageRef.put(blob, {contentType: mine});
        })
        .then(() => {
          upLoadBlob.close();
          console.log('imageRef.getDownloadURL()', imageRef.getDownloadURL());
          return imageRef.getDownloadURL();
        })
        .then(ulr => {
          console.log(ulr);
          resolve(ulr);
        })
        .catch(error => reject(error));
    });
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={this.imageLibrary}>
          <Text>uploadImage</Text>
          <Image
            source={{uri: this.state.avatarSource}}
            style={{width: 100, height: 100}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
