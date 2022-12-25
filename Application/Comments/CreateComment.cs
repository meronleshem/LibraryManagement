using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class CreateComment
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public CommentContent CommentContent { get; set; }
            public Guid BookId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.CommentContent).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {

            private readonly DataContext context;
            private readonly IMapper mapper;
            private IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await context.Books.FindAsync(request.BookId);

                if (book == null)
                    return null;

                var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userAccessor.GetUserId());

                if (user == null)
                    return null;

                var comment = new Comment
                {
                    User = user,
                    Book = book,
                    Content = request.CommentContent.Content
                };

                book.Comments.Add(comment);

                var result = await context.SaveChangesAsync() > 0;

                if(!result)
                    return Result<CommentDto>.Failure("Failed to add comment");

                return Result<CommentDto>.Success(mapper.Map<CommentDto>(comment)); 
            }
        }
    }
}