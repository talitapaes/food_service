using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreWebApp.Models
{
    public class Lanche
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public double Valor => Ingredientes.Where(i => i.Quantidade >=1).Sum(i => i.Valor);

        public int Quantidade { get; set; }

        public List<Ingrediente> Ingredientes { get; set; }

        public List<Lanche> getAllLanches()
        {
            List<Lanche> lanchesList = FillData();
            return lanchesList;
        }

        private static List<Lanche> FillData()
        {
            List<Lanche> lancheList = new List<Lanche>();
            Ingrediente ingrediente = new Ingrediente();
            List<Ingrediente> ingredientList = ingrediente.getAllIngredientes();

            lancheList.Add(new Lanche { Id = 1, Nome = "X-Bacon", Ingredientes = ingredientList.Where(i => i.Id == 1 || i.Id == 2 || i.Id == 4).ToList()});

            lancheList.Add(new Lanche { Id = 2, Nome = "X-Burguer", Ingredientes = ingredientList.Where(i => i.Id == 2 || i.Id == 4).ToList() });

            lancheList.Add(new Lanche { Id = 3, Nome = "X-Egg", Ingredientes = ingredientList.Where(i => i.Id == 2 || i.Id == 4 || i.Id == 3).ToList() });

            lancheList.Add(new Lanche { Id = 4, Nome = "X-Egg Bacon", Ingredientes = ingredientList.Where(i => i.Id == 1 || i.Id == 2 || i.Id == 3 || i.Id == 4).ToList() });

            return lancheList;
        }
    }

}
