using Microsoft.EntityFrameworkCore;

namespace FitTrackAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Gym> Gyms { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<GroupTraining> GroupTrainings { get; set; }
        public DbSet<GroupTrainingUser> GroupTrainingUsers { get; set; }
        public DbSet<IndividualTraining> IndividualTrainings { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<ExerciseInTraining> ExercisesInTraining { get; set; }
        public DbSet<Set> Sets { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<MealsPerDay> MealsPerDay { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<Good> Goods { get; set; }
        public DbSet<Service> Services { get; set; }
    }
}
