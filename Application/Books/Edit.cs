using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Edit
    {
      
        public class Command : IRequest
        {
            public Book? Book { get; set; }
        }

        public class Handle : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handle(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            async Task<Unit> IRequestHandler<Command, Unit>.Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await context.Books.FindAsync(request.Book.Id);
                
                if(book != null)
                {
                    mapper.Map(request.Book, book);

                    await context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }
    }
}