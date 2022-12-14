using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genere { get; set; }
        public int Year { get; set; }
        public int TotalQuantity {get; set;}
        public int AvailableQuantity { get; set; }
        public string Image {get; set;}
        public ICollection<BorrowBook> Borrowers {get; set;} = new List<BorrowBook>();
        public ICollection<Comment> Comments {get; set;} = new List<Comment>();
    }
}