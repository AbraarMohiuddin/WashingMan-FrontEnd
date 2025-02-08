import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Machine } from "../../data/machines";

export default function MachineCard({ machine }: { machine: Machine }) {
  const router = useRouter();

  // Choose an icon based on machine type
  const machineIcon =
    machine.type.toLowerCase() === "washer" ? "ios-water" : "ios-flame";

  return (
    <View style={styles.card}>
      {/* Main card content */}
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => router.push(`/details/${machine.id}`)}
      >
        <Ionicons
          name={machineIcon}
          size={24}
          color="#6dd5ed"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{machine.name}</Text>
          <Text style={styles.info}>Type: {machine.type}</Text>
          <Text style={styles.info}>Status: {machine.status}</Text>
          <Text style={styles.info}>Cost: ${machine.cost}</Text>
        </View>
      </TouchableOpacity>

      {/* Custom "Start Machine" button */}
      <TouchableOpacity
        style={[
          styles.button,
          machine.status.toLowerCase() === "in use" && styles.disabledButton,
        ]}
        onPress={() => router.push(`/details/${machine.id}`)}
        disabled={machine.status.toLowerCase() === "in use"}
      >
        <Text style={styles.buttonText}>Start Machine</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { marginRight: 12 },
  textContainer: { flex: 1 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#2193b0",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
