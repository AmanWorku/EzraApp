import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import tw from '../../../../tailwind';

const VideoPlayer = ({value}) => {
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
            height: 100%;
            background-color: black;
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
              videoId: '${value}',
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
          }
          
          function onPlayerReady(event) {
            event.target.playVideo();
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
    <View style={tw`w-full h-36`}>
      <WebView
        source={{html: youtubePlayerHTML}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default VideoPlayer;
