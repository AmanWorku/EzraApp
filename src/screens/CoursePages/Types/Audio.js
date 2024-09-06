import React, {useEffect, useState} from 'react';
import {View, Button, Text, Platform} from 'react-native';
import Sound from 'react-native-sound';
import tw from '../../../../tailwind';

const AudioPlayer = ({value, setIsAudioPlayed}) => {
  const [sound, setSound] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) {
      setError('Audio URL is missing');
      return;
    }

    // Encode URL if it is a remote URL
    const encodedValue = encodeURI(value);

    // Set the sound category for playback
    Sound.setCategory('Playback');

    let newSound;

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      if (encodedValue.startsWith('http') || encodedValue.startsWith('https')) {
        newSound = new Sound(encodedValue, null, err => {
          if (err) {
            setError(`Failed to load the sound: ${err.message}`);
            console.error('Failed to load the sound', err);
            return;
          }
          setSound(newSound);
        });
      } else {
        newSound = new Sound(
          require('./assets/Juniors_program_2nd_song.mp3'),
          Sound.MAIN_BUNDLE,
          err => {
            if (err) {
              setError(`Failed to load the sound: ${err.message}`);
              console.error('Failed to load the sound', err);
              return;
            }
            setSound(newSound);
          },
        );
      }
    } else {
      setError('Unsupported platform');
    }

    // Cleanup on component unmount
    return () => {
      if (newSound) {
        newSound.release();
      }
    };
  }, [value]);

  const playAudio = () => {
    if (setIsAudioPlayed) {
      setIsAudioPlayed(true);
    }
    if (sound) {
      sound.play(success => {
        if (success) {
          // console.log('Successfully finished playing');
        } else {
          setError('Playback failed due to audio decoding errors');
          console.error('Playback failed due to audio decoding errors');
        }
      });

      // Call the setIsAudioPlayed callback when audio starts playing
    } else {
      setError('Sound is not loaded yet');
    }
  };

  return (
    <View
      style={tw`flex flex-col items-center justify-center w-full p-4 bg-gray-100 rounded-lg shadow-md`}>
      <Button title="Play Audio" onPress={playAudio} />
      {error && <Text style={tw`text-red-500 mt-2`}>{error}</Text>}
    </View>
  );
};

export default AudioPlayer;
