import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import tw from '../../../../tailwind';

const getYoutubeVideoId = url => {
  const regExp =
    /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|watch\?.+&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const VideoPlayer = ({value}) => {
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const videoId = getYoutubeVideoId(value);

  const youtubePlayerHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: transparent;
          }

          #player {
            width: 100%;
            height: 12em;
            background-color: black;
            position: relative;
          }
        </style>
      </head>
      <body>
        <div id="player"></div>
        <script>
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          
          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              height: '100%',
              width: '100%',
              videoId: '${videoId}',
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
          }
          
          function onPlayerReady(event) {
            window.ReactNativeWebView.postMessage('videoReady');
          }
          
          function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
              window.ReactNativeWebView.postMessage('videoPlayed');
            }
          }
        </script>
      </body>
    </html>
  `;

  const onMessage = event => {
    if (event.nativeEvent.data === 'videoPlayed') {
    } else if (event.nativeEvent.data === 'videoReady') {
      setLoading(false); // Hide loading indicator when video is ready
    }
  };

  return (
    <View style={tw`w-full h-48`}>
      {loading && (
        <View style={[styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#EA9215" />
        </View>
      )}
      <WebView
        source={{html: youtubePlayerHTML}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={onMessage}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...tw`absolute inset-0 flex justify-center items-center bg-black`,
  },
});

export default VideoPlayer;
