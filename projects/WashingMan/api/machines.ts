import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:3000";

export const fetchMachines = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/machines`);
    return response.data;
  } catch (error) {
    console.error("Error fetching machines: ", error);
    throw error;
  }
};

export const startMachine = async (machineId: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions`, {
      machineId,
    });
    return response.data;
  } catch (error) {
    console.error("Error starting machine:", error);
  }
};
