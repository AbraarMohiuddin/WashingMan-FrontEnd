using Microsoft.AspNetCore.Mvc;
using WashingManAPI.Data;
using WashingManAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace WashingManAPI.Controllers
{
    [ApiController]
    [Route("api/machines")]
    public class MachinesController : ControllerBase
    {
        // GET: api/machines
        [HttpGet]
        public ActionResult<IEnumerable<Machine>> GetMachines()
        {
            return Ok(MachineStore.Machines);
        }

        // POST: api/machines/{id}/start
        [HttpPost("{id}/start")]
        public IActionResult StartMachine(int id)
        {
            var machine = MachineStore.Machines.FirstOrDefault(m => m.Id == id);

            if (machine == null)
            {
                return NotFound(new { message = "Machine not found" });
            }

            if (machine.Status == "In Use" || machine.Status == "Out of Order")
            {
                return BadRequest(new { message = "Machine is not available" });
            }

            machine.Status = "In Use";
            return Ok(new { message = "Machine started successfully", machine });
        }
    }
}
