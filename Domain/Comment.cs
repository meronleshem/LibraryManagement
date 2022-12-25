using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public int Id {get; set;}
        public string Content {get; set;}
        public User User {get; set;}
        public Book Book {get; set;}
        public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    }
}