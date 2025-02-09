export interface Machine {
  id: number;
  name: string;
  type: "Washer" | "Dryer";
  status: "Available" | "In Use" | "Out of Order";
  cost: number;
}
