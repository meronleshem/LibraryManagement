using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Create
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
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Books.Add(request.Book);

                var result = await context.SaveChangesAsync() > 0;

                if(!result)
                    return Result<Unit>.Failure("Failed to create book");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}