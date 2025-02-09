import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const MachineItem = ({ machine }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(tabs)/MachineDetails",
          params: { ...machine },
        })
      }
    >
      <View>
        <Text>
          {machine.name} - {machine.type}
        </Text>
        <Text>Status: {machine.status}</Text>
        <Text>Cost: ${machine.cost}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MachineItem;
