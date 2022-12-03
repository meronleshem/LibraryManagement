using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BooksController : BaseApiController
    {
        private readonly DataContext context;
        public BooksController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            return await context.Books.ToListAsync();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id)
        {
            return await context.Books.FindAsync(id);
        }
    }
}