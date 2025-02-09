using System.Collections.Generic;
using WashingManAPI.Models;

namespace WashingManAPI.Data
{
    public static class MachineStore
    {
        public static List<Machine> Machines = new List<Machine>
        {
            new Machine { Id = 1, Name = "Washer 1", Type = "Washer", Status = "Available", Cost = 2.50m },
            new Machine { Id = 2, Name = "Dryer 1", Type = "Dryer", Status = "Available", Cost = 1.75m },
            new Machine { Id = 3, Name = "Washer 2", Type = "Washer", Status = "In Use", Cost = 2.50m },
            new Machine { Id = 4, Name = "Dryer 2", Type = "Dryer", Status = "Out of Order", Cost = 1.75m }
        };
    }
}
