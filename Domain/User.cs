using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string Name {get; set;}
        public ICollection<BorrowBook> BorrowBooks {get; set;} = new List<BorrowBook>();
    }
}