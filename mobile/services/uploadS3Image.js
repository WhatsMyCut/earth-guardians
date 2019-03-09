import { ImagePicker, Permissions } from 'expo';
import mime from 'mime-types';
export default class _uploadS3Image {
  // event handler to pull up camera roll
  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this._handleImagePicked(pickerResult);
    }
  };
  // this handles the image upload to S3
  _handleImagePicked = async (pickerResult) => {
    const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
    const fileType = mime.lookup(pickerResult.uri);
    const access = { level: "public", contentType: 'image/jpeg' };
    const imageData = await fetch(pickerResult.uri)
    const blobData = await imageData.blob()

    try {
      await Storage.put(imageName, blobData, access)
    } catch (err) {
      console.log('error: ', err)
    }
  }
}
