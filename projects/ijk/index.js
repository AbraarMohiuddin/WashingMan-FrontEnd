const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let machines = [
  { id: 1, name: "Washer 1", type: "Washer", status: "Available", cost: 2.5 },
  { id: 2, name: "Dryer 1", type: "Dryer", status: "Available", cost: 1.75 },
  { id: 3, name: "Washer 2", type: "Washer", status: "Available", cost: 2.5 },
  { id: 4, name: "Dryer 2", type: "Dryer", status: "Out of Order", cost: 1.75 },
  { id: 5, name: "Dryer 3", type: "Dryer", status: "Available", cost: 1.75 },
];

// ✅ Fetch all machines
app.get("/machines", (req, res) => {
  res.json(machines);
});

app.get("/machines/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const machine = machines.find((m) => m.id === id);
  if (!machine) {
    return res.status(404).json({ message: "Machine not found" });
  }
  res.json(machine);
});

app.post("/transactions", (req, res) => {
  const { machineId } = req.body;
  const id = parseInt(machineId);
  const machine = machines.find((m) => m.id === id);

  if (!machine) {
    return res.status(404).json({ message: "Machine not found" });
  }

  if (machine.status !== "Available") {
    return res.status(400).json({ message: "Machine is not available" });
  }

  machine.status = "In Use";
  res.json({ message: "Transaction successful. Machine started.", machine });
});

app.listen(port, () => {
  console.log(`Washing Man API listening on port ${port}`);
});
