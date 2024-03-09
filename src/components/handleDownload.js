import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-toast-message';

const hasAndroidPermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const readStoragePermission =
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const writeStoragePermission =
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  try {
    const hasReadPermission = await PermissionsAndroid.check(
      readStoragePermission,
    );
    const hasWritePermission = await PermissionsAndroid.check(
      writeStoragePermission,
    );
    if (hasReadPermission && hasWritePermission) {
      return true;
    }
    const grantedPermissions = await PermissionsAndroid.requestMultiple([
      readStoragePermission,
      writeStoragePermission,
    ]);
    const readGranted = grantedPermissions[readStoragePermission] === 'granted';
    const writeGranted =
      grantedPermissions[writeStoragePermission] === 'granted';

    if (readGranted && writeGranted) {
      return true;
    } else {
      ToastAndroid.show(
        'Storage permission required to download images.',
        ToastAndroid.LONG,
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const handleDownload = async (setIsDownloading, imgUrl) => {
  setIsDownloading(true);

  if (Platform.OS === 'android') {
    try {
      const hasPermission = await hasAndroidPermission();
      if (!hasPermission) {
        console.log('Permission Denied');
        return;
      }

      const result = await CameraRoll.save(imgUrl, {type: 'photo'});
      if (result) {
        console.log('File saved to:', result);
        Toast.show({
          type: 'success',
          text1: 'Image downloaded successfully!',
        });
      } else {
        console.log('Download failed.');
        Toast.show({
          type: 'error',
          text1: 'Unable to download image. Try again later.',
        });
      }
    } catch (error) {
      console.error('Error during save to camera roll:', error);
      Toast.show({
        type: 'error',
        text1:
          'Error downloading image. Please check your internet connection.',
      });
    } finally {
      setIsDownloading(false);
    }
  } else {
    try {
      const result = await CameraRoll.save(imgUrl, {type: 'photo'});
      if (result) {
        console.log('File saved to:', result);
        Toast.show({
          type: 'success',
          text1: 'Image downloaded successfully!',
        });
      } else {
        console.log('Download failed.');
        Toast.show({
          type: 'error',
          text1: 'Unable to download image. Try again later.',
        });
      }
    } catch (error) {
      console.error('Error during save to camera roll:', error);
    } finally {
      setIsDownloading(false);
    }
  }
};

export default handleDownload;
