import Storage from '@aws-amplify/storage'
import { ImagePicker, Permissions } from 'expo';
import { RNS3 } from 'react-native-aws3';
import mime from 'mime-types';
  // event handler to pull up camera roll
export const _pickImage = async () => {
  console.log('_pickImage');
  const {
    status
  } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  if (status === 'granted') {
    console.log('camera roll was granted');
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    return _handleImagePicked(pickerResult);
  }  else{
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // _pickImage();
  }
}

  // this handles the image upload to S3
export const  _handleImagePicked = async (pickerResult) => {
  const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
  const fileType = mime.lookup(pickerResult.uri);
  const access = { level: "public", contentType: fileType };
  const imageData = await fetch(pickerResult.uri)
  const blobData = await imageData.blob()
  console.log('_handleImagePicked', {imageName, fileType});

  const file = {
    uri: imageData,
    name: imageName,
    type: fileType
  }
  const options = {
    keyPrefix: "/uploads",
    bucket: "eg-profile-pics-production",
    region: "us-east-1",
    accessKey: "AKIAJF5C6HMTBF6R6ERQ",
    secretKey: "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",
    successActionStatus: 201
  }
  try {

    // this call is causing issues
    return await RNS3.put(file, options)
    .then(res => res)
    .catch(e => console.log(e))
  } catch (err) {
    console.log('error: ', err)
  }
}
