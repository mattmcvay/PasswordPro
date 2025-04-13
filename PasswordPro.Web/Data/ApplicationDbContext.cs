using Microsoft.EntityFrameworkCore;
using PasswordPro.Web.Models.Entities;

namespace PasswordPro.Web.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Password> Passwords { get; set; }
    }
}
