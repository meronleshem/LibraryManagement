using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Books;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, Book>();
            CreateMap<Book, BookDto>();
            CreateMap<BorrowBook, BorrowerDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.User.Name))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName));
            CreateMap<User, Profiles.Profile>();
        }
    }
}