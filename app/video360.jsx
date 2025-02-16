import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useVideoPlayer , VideoView } from "expo-video" ;


const localSource = require("../assets/videos/marrakech-medina-video360.mp4")

export default function Video360() {
  const player = useVideoPlayer(localSource ,(player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play();
  });

  return(
    <View style = {styles.container}>
      <VideoView 
      player={player}
      style = {{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width * (9/16),
      }}
      allowsFullscreen
      allowsPictureInPicture
      startsPictureInPictureAutomatically
      />
      <View>
        <Button
          title='play'
          onPress={() => {
            player.play();
          }}
        />
        <Button
          title='pause'
          onPress={() => {
            player.pause();
          }}
        />

      </View>


    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
