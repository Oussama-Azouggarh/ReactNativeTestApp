import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "./homePage";
import SecondPage from "./secondPage";
import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  const [isShowSplash, setIsShoSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShoSplash(false);
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationIndependentTree>
        <SafeAreaProvider>
          <NavigationContainer>
            {isShowSplash ? <SplashScreen /> : <SecondPage />}
          </NavigationContainer>
        </SafeAreaProvider>
      </NavigationIndependentTree>
    </GestureHandlerRootView>
  );
}
