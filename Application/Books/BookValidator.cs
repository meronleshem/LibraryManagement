using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Books
{
    public class BookValidator : AbstractValidator<Book>
    {
        public BookValidator()
        {   
            RuleFor(b => b.Title).NotEmpty();
            RuleFor(b => b.Author).NotEmpty();
            RuleFor(b => b.Genere).NotEmpty();
            RuleFor(b => b.AvailableQuantity).NotEmpty();
            RuleFor(b => b.Image).NotEmpty();
        }
    }
}