using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class List
    {
        public class Query : IRequest<Result<List<BookDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<BookDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<BookDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var books = await context.Books
                    .ProjectTo<BookDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<BookDto>>.Success(books);
            }
        }
    }
}