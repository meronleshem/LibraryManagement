using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Books.Any()) return;

            var books = new List<Book>
            {
                new Book
                {
                    Title = "Game Of Thrones",
                    Author = "George R. R. Martin",
                    Genere = "Fantasy",
                    Year = 1996,
                    availableQuantity = 2
                },
                new Book
                {
                    Title = "Stay Close",
                    Author = "Harlan Coben",
                    Genere = "Thriller",
                    Year = 2012,
                    availableQuantity = 2
                },
                new Book
                {
                    Title = "The Hobbit",
                    Author = "J. R. R. Tolkien",
                    Genere = "Fantasy",
                    Year = 1937,
                    availableQuantity = 1
                },
                new Book
                {
                    Title = "The Secret",
                    Author = "Rhonda Byrne",
                    Genere = "Self-Help",
                    Year = 2006,
                    availableQuantity = 2
                },
            };

            await context.Books.AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}