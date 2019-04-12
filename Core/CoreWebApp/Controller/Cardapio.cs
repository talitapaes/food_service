using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreWebApp.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreWebApp.Controller
{
    [Route("api/[controller]")]
    public class Cardapio : ControllerBase
    {
        // GET: api/<controller>
        [HttpGet]
        public IActionResult GetMenu()
        {
            try
            {
                Menu menu = new Menu();
                Lanche lanche = new Lanche();
                Ingrediente ingrediente = new Ingrediente();

                menu.Lanches = lanche.getAllLanches();
                menu.Ingredientes = ingrediente.getAllIngredientes();

                return Ok(menu);
            }
            catch (Exception)
            {

                return BadRequest();
            }
            
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
