using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Books;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BooksController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Book book)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Book = book}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Book book)
        {
            book.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Book = book}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}