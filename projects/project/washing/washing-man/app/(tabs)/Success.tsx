import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

const SuccessScreen = () => {
  const router = useRouter();

  return (
    <View>
      <Text>Transaction Successful!</Text>
      <Button title="Go Back" onPress={() => router.push("/")} />
    </View>
  );
};

export default SuccessScreen;
