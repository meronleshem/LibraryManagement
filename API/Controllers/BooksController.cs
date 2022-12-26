using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Books;
using Application.Comments;
using Application.Core;
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
        public async Task<IActionResult> GetBooks([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = pagingParams }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize(Policy = "IsAdmin")]
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Book book)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Book = book }));
        }

        [Authorize(Policy = "IsAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Book book)
        {
            book.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Book = book }));
        }

        [Authorize(Policy = "IsAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/borrow")]
        public async Task<IActionResult> Borrow(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateBorrow.Command { Id = id }));
        }

        [HttpPost("{id}/comment")]
        public async Task<IActionResult> AddComment(Guid id, CommentContent content)
        {
            return HandleResult(await Mediator.Send(new CreateComment.Command { BookId = id, CommentContent = content }));
        }
    }
}