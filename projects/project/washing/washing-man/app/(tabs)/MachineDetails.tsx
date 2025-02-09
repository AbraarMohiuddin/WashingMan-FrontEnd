import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchMachines, startTransaction } from "../../services/api";

const MachineDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMachine() {
      setLoading(true);
      const data = await fetchMachines();
      const foundMachine = data.find((m) => m.id === parseInt(id));
      setMachine(foundMachine);
      setLoading(false);
    }
    loadMachine();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!machine) return <Text>Machine not found</Text>;

  const handleStart = async () => {
    await startTransaction(machine.id);
    Alert.alert("Success", "Machine started!");
    router.push("/Success");
  };

  return (
    <View>
      <Text>{machine.name}</Text>
      <Text>Type: {machine.type}</Text>
      <Text>Status: {machine.status}</Text>
      <Text>Cost: ${machine.cost}</Text>
      <Button title="Start Machine" onPress={handleStart} />
    </View>
  );
};

export default MachineDetails;
