import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { BackHandler } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [pin, setPin] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const EXIT_PIN = "1234"; // Change to your desired PIN

  useEffect(() => {
    // Keep the screen awake
    activateKeepAwakeAsync();

    if (Platform.OS === "android") {
      // Prevent users from using the back button
      const backAction = () => {
        return true; // Block back button
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove(); // Clean up
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleExitKiosk = () => {
    if (pin === EXIT_PIN) {
      deactivateKeepAwake();
      Alert.alert("Success", "Exiting Kiosk Mode.");
      setIsLocked(false);
    } else {
      Alert.alert("Error", "Incorrect PIN.");
    }
    setPin("");
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isLocked ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Enter Admin PIN to Exit Kiosk Mode</Text>
          <TextInput
            value={pin}
            onChangeText={setPin}
            secureTextEntry
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              width: 200,
              textAlign: "center",
              margin: 10,
              padding: 5,
            }}
          />
          <Button title="Submit" onPress={handleExitKiosk} />
        </View>
      ) : (
        <>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </>
      )}
    </ThemeProvider>
  );
}
