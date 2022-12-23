using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class UpdateBorrow
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await context.Books
                    .Include(b => b.Borrowers).ThenInclude(u => u.User)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if( book == null) 
                    return null;

                var user = await context.Users
                    .FirstOrDefaultAsync(u => u.Id == userAccessor.GetUserId());

                var borrower = book.Borrowers.FirstOrDefault(x => x.User.UserName == user.UserName);

                if( borrower != null)
                {
                    book.Borrowers.Remove(borrower);
                    book.AvailableQuantity++;
                }
                else if( borrower == null)
                {
                    borrower = new BorrowBook
                    {
                        User = user,
                        Book = book,
                        LoanDate = DateTime.Now,
                        ReturnDate = null
                    };
                    book.Borrowers.Add(borrower);
                    book.AvailableQuantity--;
                }

                var result = await context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating borrow book");
            }
        }
    }
}