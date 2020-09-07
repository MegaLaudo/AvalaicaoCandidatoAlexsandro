using Microsoft.EntityFrameworkCore;
using SimpleAPI.Models;

namespace SimpleAPI.Data{
    public class DataContext : DbContext{
        public DataContext(DbContextOptions<DataContext> options) : base(options){

        }

        public DbSet<Cliente> Clientes {get; set;}
        public DbSet<Servico> Servicos {get; set;}
        public DbSet<Veiculo> Veiculos {get; set;}
        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
            optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["BloggingDatabase"].ConnectionString);
        }
        */
    }
}