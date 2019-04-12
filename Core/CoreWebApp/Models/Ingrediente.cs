using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreWebApp.Models
{
    public class Ingrediente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public double Valor { get; set; }

        public int Quantidade { get; set; } = 0;

        public List<Ingrediente> getAllIngredientes()
        {
            List<Ingrediente> ingredientList = FillData();
            return ingredientList;
        }

        private static List<Ingrediente> FillData()
        {
            List<Ingrediente> ingredienteList = new List<Ingrediente>();
            ingredienteList.Add(new Ingrediente { Id = 1, Nome = "Alface", Valor = 0.40, Quantidade = 1});
            ingredienteList.Add(new Ingrediente { Id = 2, Nome = "Bacon", Valor = 2.0, Quantidade = 1 });
            ingredienteList.Add(new Ingrediente { Id = 3, Nome = "Hamburguer de Carne", Valor = 3.0 , Quantidade =1 });
            ingredienteList.Add(new Ingrediente { Id = 4, Nome = "Ovo", Valor = 0.80, Quantidade = 1 });
            ingredienteList.Add(new Ingrediente { Id = 5, Nome = "QUeijo", Valor = 1.50, Quantidade =1 });

            return ingredienteList;
        }

    }
}
