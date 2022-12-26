using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Books
{
    public class BookParams : PagingParams
    {
        public bool IsAvailable { get; set; }

        public bool IsBorrowing { get; set; }
    }
}