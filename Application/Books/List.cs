using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class List
    {
        public class Query : IRequest<List<Book>> { }

        public class Handler : IRequestHandler<Query, List<Book>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Book>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Books.ToListAsync();
            }
        }
    }
}