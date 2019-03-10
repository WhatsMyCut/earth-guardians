import Storage from '@aws-amplify/storage'
import { ImagePicker, Permissions } from 'expo';
import mime from 'mime-types';
// event handler to pull up camera roll
export const _pickImage = async () => {
  console.log('_pickImage');
  const {
    status: cameraRollPerm
  } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (cameraRollPerm === 'granted') {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    _handleImagePicked(pickerResult);
  }
};
// this handles the image upload to S3
export const _handleImagePicked = async (pickerResult) => {
  console.log('_handleImagePicked');
  const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
  const fileType = mime.lookup(pickerResult.uri);
  const access = { level: "public", contentType: fileType };
  const imageData = await fetch(pickerResult.uri)
  const blobData = await imageData.blob()

  try {
    await Storage.put(imageName, blobData, access)
    .then(res => res)
  } catch (err) {
    console.log('error: ', err)
  }
}

