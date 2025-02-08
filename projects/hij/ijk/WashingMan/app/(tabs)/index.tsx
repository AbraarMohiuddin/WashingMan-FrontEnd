import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Animated,
  RefreshControl,
  Text, // (if needed)
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MachineCard from "../components/MachineCard";
import { fetchMachines } from "../../api/machines";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const [machines, setMachines] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Function to load machine data
  const loadMachines = useCallback(() => {
    setRefreshing(true);
    fetchMachines()
      .then((data) => {
        setMachines(data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching machines", error);
        setRefreshing(false);
      });
  }, []);

  // Animate header fade-in
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Use useFocusEffect to refetch machines when screen regains focus
  useFocusEffect(
    useCallback(() => {
      loadMachines();
    }, [loadMachines])
  );

  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
        <Ionicons
          name="ios-car-wash"
          size={32}
          color="#fff"
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Laundry Machines</Text>
      </Animated.View>
      <FlatList
        data={machines}
        renderItem={({ item }) => <MachineCard machine={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadMachines} />
        }
      />
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
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  contentContainer: { paddingHorizontal: 16, paddingBottom: 32 },
});
