using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<BorrowBook> BorrowBooks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BorrowBook>(x => x.HasKey(bb => new { bb.UserId, bb.BookId }));

            builder.Entity<BorrowBook>()
                .HasOne(u => u.User)
                .WithMany(b => b.BorrowBooks)
                .HasForeignKey(bb => bb.UserId);

            builder.Entity<BorrowBook>()
                .HasOne(b => b.Book)
                .WithMany(b => b.Borrowers)
                .HasForeignKey(bb => bb.BookId);
        }
    }
}