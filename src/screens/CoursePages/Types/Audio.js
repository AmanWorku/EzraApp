import React, {useEffect, useState} from 'react';
import {View, Button, Text} from 'react-native';
import Sound from 'react-native-sound';
import tw from '../../../../tailwind';

const AudioPlayer = ({audioUrl}) => {
  const [sound, setSound] = useState(null);
  const [error, setError] = useState(null);
  console.log(audioUrl);
  useEffect(() => {
    // Set the sound category for playback
    Sound.setCategory('Playback');

    // Load the sound file
    const newSound = new Sound(audioUrl, null, err => {
      if (err) {
        setError('Failed to load the sound');
        console.error('Failed to load the sound', err);
        return;
      }
      setSound(newSound);
    });

    // Cleanup on component unmount
    return () => {
      if (newSound) {
        newSound.release();
      }
    };
  }, [audioUrl]);

  const playAudio = () => {
    if (sound) {
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          setError('Playback failed due to audio decoding errors');
          console.error('Playback failed due to audio decoding errors');
        }
      });
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
