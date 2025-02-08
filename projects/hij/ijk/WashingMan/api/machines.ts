import axios from "axios";

// IMPORTANT: On Android the backend might be reachable via 10.0.2.2 instead of localhost.
const API_BASE_URL = "http://10.0.2.2:3000";

export const fetchMachines = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/machines`);
    return response.data; // expecting an array of machines
  } catch (error) {
    console.error("Error fetching machines: ", error);
    throw error;
  }
};

export const startMachine = async (machineId: number | string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/machines/${machineId}/start`
    );
    return response.data;
  } catch (error) {
    console.error("Error starting machine: ", error);
    throw error;
  }
};
