import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import tw from '../../../../tailwind';

const getYoutubeVideoId = url => {
  const regExp =
    /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|watch\?.+&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const VideoPlayer = ({value}) => {
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
          }
          
          function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.ENDED) {
              console.log('video has finished playing!');
            }
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View style={tw`w-full h-48`}>
      <WebView
        source={{html: youtubePlayerHTML}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default VideoPlayer;
