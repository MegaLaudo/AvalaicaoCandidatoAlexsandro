using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;
using SimpleAPI.Models;

namespace SimpleAPI.Controllers{
    [ApiController]
    [Route("v1/veicles")]
    public class VeiculoController : ControllerBase{
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Veiculo>>> Get([FromServices] DataContext context){
            var veiculos = await context.Veiculos.ToListAsync();
            return veiculos;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Veiculo>> Post([FromServices] DataContext context, [FromBody]Veiculo model){
            if (ModelState.IsValid){
                context.Veiculos.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            return BadRequest(ModelState);
        }
    }
}