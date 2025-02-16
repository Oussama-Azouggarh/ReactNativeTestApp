import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { Video } from 'expo-av';

export default function App() {
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const videoAsset = Asset.fromModule(require('../assets/videos/marrakech-medina-video360.mp4'));
        await videoAsset.downloadAsync();
        setVideoReady(true);
      } catch (error) {
        console.error('Erreur de chargement:', error);
      }
    })();
  }, []);

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  if (!videoReady) return null;

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && (
        <Video
          ref={videoRef}
          source={require('../assets/videos/marrakech-medina-video360.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={StyleSheet.absoluteFill}
        />
      )}
      <GLView
        style={styles.glView}
        onContextCreate={async (gl) => {
          const renderer = new THREE.WebGLRenderer({ context: gl });
          renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
          renderer.setClearColor(0x000000, 1);

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            40,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
          );
          camera.position.set(0, -15, 10);

          const texture = new THREE.Texture();
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBFormat;

          const geometry = new THREE.SphereGeometry(500, 60, 40);
          geometry.scale(-1, 1, 1);
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const sphere = new THREE.Mesh(geometry, material);
          scene.add(sphere);

          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };

          animate();
        }}
      />
      <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
        <Text style={styles.controlButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glView: { flex: 1 },
  controlButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  controlButtonText: { color: 'white', fontSize: 16 },
});
