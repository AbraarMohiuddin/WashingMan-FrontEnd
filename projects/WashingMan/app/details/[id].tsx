import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { fetchMachines, startMachine } from "../../api/machines";

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const [machine, setMachine] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    fetchMachines()
      .then((data) => {
        const found = data.find((m: any) => m.id.toString() === id);
        setMachine(found);
      })
      .catch((error) => console.error("Error fetching machine", error));
  }, [id]);

  const handlePayment = () => {
    if (!machine) return;
    startMachine(machine.id)
      .then(() => {
        alert("Payment Successful! Starting machine...");
        router.back();
      })
      .catch((error) => {
        alert("Error starting machine");
        console.error("Error starting machine", error);
      });
  };

  if (!machine)
    return <Text style={styles.errorText}>Select a Machine first!</Text>;

  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
        <Ionicons
          name="information-circle-outline"
          size={32}
          color="#fff"
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Machine Details</Text>
      </Animated.View>

      <View style={styles.card}>
        <Text style={styles.title}>{machine.name}</Text>
        <Text style={styles.info}>Type: {machine.type}</Text>
        <Text style={styles.info}>Status: {machine.status}</Text>
        <Text style={styles.info}>Cost: ${machine.cost}</Text>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Ionicons
            name="card-outline"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Pay ${machine.cost}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerIcon: { marginRight: 10 },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
  },
  button: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#2193b0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: { marginRight: 8 },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
});
