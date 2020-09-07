using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;
using SimpleAPI.Models;

namespace SimpleAPI.Controllers{
    [ApiController]
    [Route("v1/clients")]
    public class ClienteController : ControllerBase{
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Cliente>>> Get([FromServices] DataContext context){
            var clientes = await context.Clientes.ToListAsync();
            return clientes;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Cliente>> Post([FromServices] DataContext context, [FromBody]Cliente model){
            if (ModelState.IsValid){
                context.Clientes.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            return BadRequest(ModelState);
        }
    }
}