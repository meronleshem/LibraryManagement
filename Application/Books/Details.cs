using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Details
    {
        public class Query : IRequest<Book>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Book>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Book> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Books.FindAsync(request.Id);
            }
        }
    }
}