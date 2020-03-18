import ImagePicker from 'react-native-image-picker';
import Storage from '@react-native-firebase/storage';

export const pickImageFromDevice = () => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const resultPromise = new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.error) {
        reject('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        reject('User tapped custom button: ', response.customButton);
      } else {
        resolve(response);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  });

  return resultPromise;
};

export const uploadImage = async (filePath, fileBase64, fileName) => {
  try {
    const storageRef = Storage().ref(`avatar/${fileName}`);

    const res = await storageRef.putString(
      fileBase64,
      Storage.StringFormat.BASE64,
    );

    const downloadUrl = await storageRef.getDownloadURL();
    console.log('get downloadUrl: ', downloadUrl);

    return downloadUrl;
  } catch (error) {
    console.log('==UPLOAD:', error);
    throw error;
  }
};

const pickAndUpload = async () => {
  const source = await pickImageFromDevice();
  console.log('========== PICKUP RES', source);
  await uploadImage(source.uri, source.fileName);
};

export default pickAndUpload;
