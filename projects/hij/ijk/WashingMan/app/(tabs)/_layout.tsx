import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  BackHandler,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import * as SecureStore from "expo-secure-store";
import * as NavigationBar from "expo-navigation-bar";
import { MaterialIcons } from "@expo/vector-icons";

// Kiosk Mode Manager
const useKioskMode = () => {
  const [isKioskActive, setIsKioskActive] = useState(true);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const PIN_KEY = "kiosk_pin";

  // Initialize Kiosk Mode
  useEffect(() => {
    const initKiosk = async () => {
      await activateKeepAwakeAsync();
      if (Platform.OS === "android") {
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync("overlay-swipe");
      }

      // Load PIN from secure storage
      const storedPin = await SecureStore.getItemAsync(PIN_KEY);
      if (!storedPin) {
        await SecureStore.setItemAsync(PIN_KEY, "0000"); // Default PIN
      }
    };

    initKiosk();
    return () => {
      deactivateKeepAwake();
      if (Platform.OS === "android") {
        NavigationBar.setVisibilityAsync("visible");
      }
    };
  }, []);

  // Android Back Button Handler
  useEffect(() => {
    if (Platform.OS === "android") {
      const backAction = () => {
        if (isKioskActive) {
          setShowPinPrompt(true);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, [isKioskActive]);

  // Handle PIN Verification
  const verifyPin = async (enteredPin: string) => {
    const storedPin = await SecureStore.getItemAsync(PIN_KEY);
    return enteredPin === storedPin;
  };

  // Exit Kiosk Mode
  const exitKiosk = async () => {
    deactivateKeepAwake();
    setIsKioskActive(false);
    if (Platform.OS === "android") {
      await NavigationBar.setVisibilityAsync("visible");
    }
    // Optional: Close app or navigate to exit screen
  };

  return {
    isKioskActive,
    showPinPrompt,
    setShowPinPrompt,
    verifyPin,
    exitKiosk,
  };
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [pin, setPin] = useState("");
  const {
    isKioskActive,
    showPinPrompt,
    setShowPinPrompt,
    verifyPin,
    exitKiosk,
  } = useKioskMode();

  const handleExit = async () => {
    if (await verifyPin(pin)) {
      await exitKiosk();
      Alert.alert("Success", "Exiting kiosk mode");
      setShowPinPrompt(false);
    } else {
      Alert.alert("Error", "Incorrect PIN");
    }
    setPin("");
  };

  return (
    <View style={styles.container}>
      {showPinPrompt ? (
        <View style={styles.pinContainer}>
          <Text style={styles.title}>Enter Admin PIN</Text>
          <TextInput
            value={pin}
            onChangeText={setPin}
            secureTextEntry
            keyboardType="number-pad"
            style={styles.input}
            maxLength={4}
          />
          <View style={styles.buttonGroup}>
            <Button title="Submit" onPress={handleExit} />
            <Button
              title="Cancel"
              onPress={() => setShowPinPrompt(false)}
              color="#666"
            />
          </View>
        </View>
      ) : (
        <>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: false,
              tabBarStyle: isKioskActive ? styles.hiddenTabBar : {},
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons
                    name={focused ? "home" : "home-filled"}
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="machines"
              options={{
                title: "Machines",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons
                    name={
                      focused
                        ? "local-laundry-service"
                        : "local-laundry-service"
                    }
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>

          {isKioskActive && (
            <TouchableOpacity
              onPress={() => setShowPinPrompt(true)}
              style={styles.adminButton}
            >
              <MaterialIcons
                name="admin-panel-settings"
                size={24}
                color="white"
              />
              <Text style={styles.adminText}>Admin</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pinContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 20,
  },
  adminButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 25,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  adminText: {
    color: "white",
    fontWeight: "bold",
  },
  hiddenTabBar: {
    display: "none",
  },
});
