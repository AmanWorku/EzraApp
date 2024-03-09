import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

export const handleShare = async imageURI => {
  try {
    if (!imageURI) {
      throw new Error('No image name provided');
    }

    const filename = 'devotional_image.jpg';
    const localFile = `${RNFS.CachesDirectoryPath}/${filename}`;

    // Download the image file using native fetch API
    const response = await fetch(imageURI);
    if (!response.ok) {
      throw new Error(`Network response was not ok for URI: ${imageURI}`);
    }
    const imageBlob = await response.blob();

    // Process the image blob and write to local file system
    const base64data = await blobToBase64(imageBlob);
    await RNFS.writeFile(localFile, base64data, 'base64');

    // Share the image file using react-native-share
    const shareOptions = {
      title: 'Share Devotional',
      url: `file://${localFile}`,
      type: 'image/jpeg',
    };

    await Share.open(shareOptions);
  } catch (error) {
    console.error('Error during sharing:', error);
  }
};

const blobToBase64 = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Strip off the first part of the data URL
      const base64data = reader.result.split(',')[[1]];
      resolve(base64data);
    };
    reader.onerror = () => reject(new Error('Failed to read blob as base64'));
    reader.readAsDataURL(blob);
  });
};
