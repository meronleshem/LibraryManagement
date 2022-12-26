using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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
            public BookParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PageList<BookDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<PageList<BookDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  context.Books
                    .OrderBy(b => b.Genere)
                    .ProjectTo<BookDto>(mapper.ConfigurationProvider)
                    .AsQueryable();

                if (request.Params.IsBorrowing)
                {
                    var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userAccessor.GetUserId());
                    query = query.Where(b => b.Borrowers.Any(borrower => borrower.Username == user.UserName));
                }

                else if(request.Params.IsAvailable)
                {
                    query = query.Where(b => b.AvailableQuantity > 0);
                }

                return Result<PageList<BookDto>>.Success(
                    await PageList<BookDto>.CreateAsync(query,
                        request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}