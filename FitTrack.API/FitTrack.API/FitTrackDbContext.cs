using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;

namespace FitTrack.API
{
    public class FitTrackDbContext : DbContext
    {
        public FitTrackDbContext(DbContextOptions<FitTrackDbContext> options) : base(options)
        {
            
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Host=localhost;Database=FitTrack;Username=admin_db;Password=password@12345#");
        //}


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
        public DbSet<TrainingProgram> TrainingPrograms { get; set; }
        public DbSet<TrainingInProgram> TrainingsInProgram { get; set; }
        public DbSet<WeightsInfo> Weights { get; set; }
        public DbSet<StepsInfo> Steps { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Owner>().ToTable("Owners");
            modelBuilder.Entity<Admin>().ToTable("Admins");
            modelBuilder.Entity<Trainer>().ToTable("Trainers");
            modelBuilder.Entity<User>().ToTable("Users");

            modelBuilder.Entity<IndividualTraining>().ToTable("IndividualTrainings");
            modelBuilder.Entity<GroupTraining>().ToTable("GroupTrainings");
            modelBuilder.Entity<GroupTrainingUser>().ToTable("GroupTrainingUsers");
            modelBuilder.Entity<TrainingInProgram>().ToTable("TrainingsInProgram");

            modelBuilder.Entity<TrainingProgram>().ToTable("TrainingPrograms");

            modelBuilder.Entity<Exercise>().ToTable("Exercises");
            modelBuilder.Entity<ExerciseInTraining>().ToTable("ExercisesInTraining");
            modelBuilder.Entity<Set>().ToTable("Sets");

            modelBuilder.Entity<Service>().ToTable("Services");
            modelBuilder.Entity<Good>().ToTable("Goods");
            modelBuilder.Entity<Purchase>().ToTable("Purchases");

            modelBuilder.Entity<Meal>().ToTable("Meals");
            modelBuilder.Entity<MealsPerDay>().ToTable("MealsPerDay");

            modelBuilder.Entity<Membership>().ToTable("Memberships");

            modelBuilder.Entity<Gym>().ToTable("Gyms");


            //modelBuilder.Entity<User>()
            //    .HasOne(u => u.Gym)
            //    .WithMany(g => g.Users)
            //    .HasForeignKey(u => u.GymId);

            //modelBuilder.Entity<User>()
            //    .HasOne(u => u.Trainer)
            //    .WithMany(t => t.Users)
            //    .HasForeignKey(u => u.TrainerId);

            //modelBuilder.Entity<User>()
            //    .HasOne(u => u.Membership)
            //    .WithOne(m => m.User)
            //    .HasForeignKey<Membership>(m => m.UserId);

            //modelBuilder.Entity<Membership>()
            //    .HasOne(m => m.Gym)
            //    .WithMany(g => g.Memberships)
            //    .HasForeignKey(m => m.GymId);

            //modelBuilder.Entity<Trainer>()
            //    .HasOne(t => t.Gym)
            //    .WithMany(g => g.Trainers)
            //    .HasForeignKey(t => t.Gym_Id);

            //modelBuilder.Entity<GroupTraining>()
            //    .HasOne(gt => gt.Gym)
            //    .WithMany(g => g.GroupTrainings)
            //    .HasForeignKey(gt => gt.GymId);

            //modelBuilder.Entity<GroupTraining>()
            //    .HasOne(gt => gt.Trainer)
            //    .WithMany(t => t.GroupTrainings)
            //    .HasForeignKey(gt => gt.TrainerId);

            //modelBuilder.Entity<GroupTrainingUser>()
            //    .HasOne(gtu => gtu.User)
            //    .WithMany(u => u.GroupTrainingUsers)
            //    .HasForeignKey(gtu => gtu.UserId);

            //modelBuilder.Entity<GroupTrainingUser>()
            //    .HasOne(gtu => gtu.GroupTraining)
            //    .WithMany(gt => gt.GroupTrainingUsers)
            //    .HasForeignKey(gtu => gtu.TrainingId);

            //modelBuilder.Entity<ExerciseInTraining>()
            //        .Property(e => e.TrainingType)
            //        .HasConversion<int>(); 

            //modelBuilder.Entity<ExerciseInTraining>()
            //    .HasOne(eit => eit.Exercise)
            //    .WithMany(e => e.ExercisesInTraining)
            //    .HasForeignKey(eit => eit.ExerciseId);

            //modelBuilder.Entity<Set>()
            //    .HasOne(s => s.Exercise)
            //    .WithMany(e => e.Sets)
            //    .HasForeignKey(s => s.ExerciseId);


            //modelBuilder.Entity<Purchase>()
            //    .Property(e => e.ItemType)
            //    .HasConversion<int>(); 

            //modelBuilder.Entity<Purchase>()
            //    .HasOne(p => p.User)
            //    .WithMany(u => u.Purchases)
            //    .HasForeignKey(p => p.UserId);

            //modelBuilder.Entity<Service>()
            //    .HasMany(s => s.Purchases)
            //    .WithOne()
            //    .HasForeignKey(p => p.ItemId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Good>()
            //    .HasMany(g => g.Purchases)
            //    .WithOne()
            //    .HasForeignKey(p => p.ItemId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<MealsPerDay>()
            //    .HasOne(mpd => mpd.Meal)
            //    .WithMany(m => m.MealsPerDay)
            //    .HasForeignKey(mpd => mpd.MealId);

            //modelBuilder.Entity<MealsPerDay>()
            //    .HasOne(mpd => mpd.User)
            //    .WithMany(u => u.MealsPerDay)
            //    .HasForeignKey(mpd => mpd.UserId);

            //modelBuilder.Entity<TrainingProgram>()
            //    .HasOne(tp => tp.Trainer)
            //    .WithMany(t => t.TrainingPrograms)
            //    .HasForeignKey(tp => tp.TrainerId);

            //modelBuilder.Entity<TrainingInProgram>()
            //    .HasOne(tip => tip.TrainingProgram)
            //    .WithMany(tp => tp.TrainingsInProgram)
            //    .HasForeignKey(tip => tip.TrainingProgramId);
        }
    }
}
