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
        public class Query : IRequest<Result<PageList<BookDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PageList<BookDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<PageList<BookDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  context.Books
                    .OrderBy(b => b.Genere)
                    .ProjectTo<BookDto>(mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PageList<BookDto>>.Success(
                    await PageList<BookDto>.CreateAsync(query,
                        request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}