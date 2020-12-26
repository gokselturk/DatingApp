using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValuesController : ControllerBase
    {

        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context=context;
        }

        [HttpGet]
        public async Task<ActionResult<string[]>> GetValues()
        {
           var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public ActionResult<string> GetValue(int id)
        {
           var value = _context.Values.FirstOrDefault(x=>x.Id == id);
            return Ok(value);
        }
    }
}
