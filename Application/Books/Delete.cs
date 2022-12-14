using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var book = await context.Books.FindAsync(request.Id);

                if(book == null)
                    return null;

                context.Remove(book);

                var result = await context.SaveChangesAsync() > 0;

                if(!result)
                    return Result<Unit>.Failure("Failed to delete book");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}