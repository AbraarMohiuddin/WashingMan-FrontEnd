import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import MachineItem from "../../components/MachineItem";
import { fetchMachines } from "../../services/api"; // Direct API call

const HomeScreen = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMachines() {
      setLoading(true);
      const data = await fetchMachines();
      setMachines(data);
      setLoading(false);
    }
    loadMachines();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: "center", marginVertical: 10 }}>
        Select a Machine
      </Text>
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MachineItem machine={item} />}
      />
    </View>
  );
};

export default HomeScreen;
