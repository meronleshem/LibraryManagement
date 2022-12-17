using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {

            if(!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new User{Name = "Meron", UserName = "meron", Email = "meron@test.com"},
                    new User{Name = "Eden", UserName = "eden", Email = "eden@test.com"},
                    new User{Name = "Yakov", UserName = "yakov", Email = "yakov@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }


            if (context.Books.Any()) return;

            var books = new List<Book>
            {
                new Book
                {
                    Title = "Game Of Thrones",
                    Author = "George R. R. Martin",
                    Genere = "Fantasy",
                    Year = 1996,
                    TotalQuantity = 3,
                    AvailableQuantity = 2,
                    Image = "http://www.georgerrmartin.com/wp-content/uploads/2013/03/GOTMTI2.jpg"
                },
                new Book
                {
                    Title = "Stay Close",
                    Author = "Harlan Coben",
                    Genere = "Thriller",
                    Year = 2012,
                    TotalQuantity = 3,
                    AvailableQuantity = 2,
                    Image = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347702195l/11737271.jpg"
                },
                new Book
                {
                    Title = "The Hobbit",
                    Author = "J. R. R. Tolkien",
                    Genere = "Fantasy",
                    Year = 1937,
                    TotalQuantity = 2,
                    AvailableQuantity = 1,
                    Image = "https://m.media-amazon.com/images/I/413V3sIKSJL._AC_SY780_.jpg"
                },
                new Book
                {
                    Title = "The Secret",
                    Author = "Rhonda Byrne",
                    Genere = "Self-Help",
                    Year = 2006,
                    TotalQuantity = 2,
                    AvailableQuantity = 2,
                    Image = "https://m.media-amazon.com/images/I/413V3sIKSJL._AC_SY780_.jpg"
                },
            };

            await context.Books.AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}