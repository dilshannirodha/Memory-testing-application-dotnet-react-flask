using backend.Models;
using backend.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<EvaluationResult> EvaluationResults { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EvaluationResult>()
                .HasOne<User>()
                .WithMany() 
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EvaluationResult>()
                .HasKey(e => e.ResultId);
        }

      

    }
}