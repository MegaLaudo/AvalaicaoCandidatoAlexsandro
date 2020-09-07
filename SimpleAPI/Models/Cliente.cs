using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.Models{
    public class Cliente{
        [Key]
        public int ClienteId { get; set; }
        [Required(ErrorMessage = "Este Campo é obrigatório")]
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
    }
}