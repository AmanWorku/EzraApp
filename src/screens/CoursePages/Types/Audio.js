import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null);
  const {position, duration} = useProgress();

  useTrackPlayerEvents([Event.PlaybackState], event => {
    setPlaybackState(event.state);
    if (event.state === State.Playing || event.state === State.Paused) {
      setIsLoading(false); // Stop loading once audio starts or pauses
    }
  });

  useEffect(() => {
    if (!value) {
      setError('Audio URL is missing');
      return;
    }

    const startPlayer = async () => {
      setIsLoading(true); // Start loading when initializing player
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'trackId',
        url: value,
        title: 'Audio Track',
        artist: 'Artist Name',
      });
    };

    startPlayer().catch(err => {
      setIsLoading(false); // Stop loading in case of error
      setError(`Failed to load the sound: ${err.message}`);
      console.error('Failed to load the sound', err);
    });

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
    const currentState = await TrackPlayer.getState();
    if (currentState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      setIsLoading(true); // Start loading when play is pressed
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
        minimumTrackTintColor="#EA9215"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#EA9215"
      />

      <View style={tw`flex flex-row justify-between w-full px-2 mt-[-8]`}>
        <Text style={tw`font-nokia-bold text-primary-1`}>
          {formatTime(position)}
        </Text>
        <Text style={tw`font-nokia-bold text-primary-1`}>
          {formatTime(duration)}
        </Text>
      </View>

      {/* Play/Pause Button or Loading Spinner */}
      <TouchableOpacity onPress={togglePlayback} style={tw`mt-[-18]`}>
        {isLoading ? (
          <ActivityIndicator size={36} color="#EA9215" /> // Loading Spinner
        ) : playbackState === State.Playing ? (
          <Pause size={36} color="#EA9215" /> // Pause icon when playing
        ) : (
          <Play size={36} color="#EA9215" /> // Play icon when paused or stopped
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;
