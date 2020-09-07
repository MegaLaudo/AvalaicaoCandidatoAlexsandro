using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using SimpleAPI.Data;
using SimpleAPI.Models;

namespace SimpleAPI.Controllers{
    [ApiController]
    [Route("v1/services")]
    public class ServicoController : ControllerBase{
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Servico>>> Get([FromServices] DataContext context){
            var servicos = await context.Servicos.Include(x => x.Cliente).Include(y => y.Veiculo).ToListAsync();
            return servicos;
        }

        [HttpGet]
        [Route("clients/{clientid:int}")]
        public async Task<ActionResult<List<Servico>>> GetByClientId([FromServices] DataContext context, int clientid){
            var servicos = await context.Servicos.Include(x => x.Cliente).AsNoTracking()
                            .Where(x => x.Cliente.ClienteId == clientid).ToListAsync();
            return servicos;
        }

        [HttpGet]
        [Route("veicles/{veicleid:int}")]
        public async Task<ActionResult<List<Servico>>> GetByVeicleId([FromServices] DataContext context, int idveicle){
            var servicos = await context.Servicos.Include(x => x.Veiculo).AsNoTracking()
                            .Where(x => x.Veiculo.VeiculoId == idveicle).ToListAsync();
            return servicos;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Servico>> Post([FromServices] DataContext context, [FromBody]Servico model){
            if (ModelState.IsValid){
                context.Servicos.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            return BadRequest(ModelState);
        }
    }
}