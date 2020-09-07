using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.Models{
    public class Servico{
        [Key]
        public int ServicoId { get; set; }
        public string Nome { get; set; }
        public string Descicao { get; set; }
        public int ClientId {get; set; }
        public int VeiculoId {get; set; }
        public Cliente Cliente { get; set; }
        public Veiculo Veiculo { get; set; }
        public double Valor { get; set; }
    }
}