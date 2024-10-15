import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  useProgress,
} from 'react-native-track-player';
import {Pause, Play} from 'phosphor-react-native'; // Import Phosphor icons
import tw from '../../../../tailwind';

const AudioPlayer = ({value, onNext}) => {
  const [playbackState, setPlaybackState] = useState(State.None);
  const [error, setError] = useState(null);
  const {position, duration} = useProgress();

  // Listen for changes in playback state (Playing, Paused, etc.)
  useTrackPlayerEvents([Event.PlaybackState], event => {
    setPlaybackState(event.state);
  });

  useEffect(() => {
    if (!value) {
      setError('Audio URL is missing');
      return;
    }

    const startPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'trackId',
        url: value,
        title: 'Audio Track',
        artist: 'Artist Name',
      });
    };

    startPlayer().catch(err => {
      setError(`Failed to load the sound: ${err.message}`);
      console.error('Failed to load the sound', err);
    });

    // Cleanup: Reset the player when component unmounts or value changes
    return () => {
      TrackPlayer.reset(); // Use reset instead of destroy
    };
  }, [value]);

  useEffect(() => {
    if (onNext) {
      stopPlayback();
    }
  }, [onNext]);

  const stopPlayback = async () => {
    await TrackPlayer.stop();
  };

  const togglePlayback = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = async value => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <View
      style={tw`flex flex-col items-center justify-center w-full p-4 bg-secondary-5 rounded-2 shadow-md`}>
      <Slider
        style={tw`w-full`}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={handleSeek}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1FB28A"
      />

      <View style={tw`flex flex-row justify-between w-full px-2`}>
        <Text style={tw`font-nokia-bold text-primary-1`}>
          {formatTime(position)}
        </Text>
        <Text style={tw`font-nokia-bold text-primary-1`}>
          {formatTime(duration)}
        </Text>
      </View>
      <TouchableOpacity onPress={togglePlayback} style={tw`mt-2`}>
        {playbackState === State.Playing ? (
          <Pause size={36} color="#1FB28A" />
        ) : (
          <Play size={36} color="#1FB28A" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;
