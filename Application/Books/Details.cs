using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Details
    {
        public class Query : IRequest<Result<Book>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Book>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Book>> Handle(Query request, CancellationToken cancellationToken)
            {
                var book = await this.context.Books.FindAsync(request.Id);

                return Result<Book>.Success(book);
            }
        }
    }
}