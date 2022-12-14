using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Edit
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Book? Book { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(b => b.Book).SetValidator(new BookValidator());
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await context.Books.FindAsync(request.Book.Id);

                if(book == null)
                    return null;

                mapper.Map(request.Book, book);

                var result = await context.SaveChangesAsync() > 0;
                if(!result)
                    return Result<Unit>.Failure("Failed to update book");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}