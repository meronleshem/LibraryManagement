using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsAdminRequirement : IAuthorizationRequirement
    {

    }

    public class IsAdminRequirementHandler : AuthorizationHandler<IsAdminRequirement>
    {
        private readonly DataContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;
        public IsAdminRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdminRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Task.CompletedTask;

            var user = dbContext.Users.FirstOrDefault(u => u.Id == userId);

            if(user.IsAdmin == true) 
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}