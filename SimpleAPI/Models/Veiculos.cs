using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.Models{
    public class Veiculo{
        [Key]
        public int VeiculoId { get; set; }
        public string Placa { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string AnoModelo { get; set; }
        public string AnoFabricacao { get; set; }
    }
}