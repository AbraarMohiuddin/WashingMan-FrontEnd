import axios from "axios";

const API_URL = "http://10.0.2.2:3000"; // for Android emulator

export const fetchMachines = async () => {
  try {
    const response = await axios.get(`${API_URL}/machines`);
    return response.data;
  } catch (error) {
    console.error("Error fetching machines:", error);
    return [];
  }
};

export const startTransaction = async (machineId: number) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, { machineId });
    return response.data;
  } catch (error) {
    console.error("Error starting machine:", error);
  }
};
