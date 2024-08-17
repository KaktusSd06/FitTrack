public class User : Person
{
    public int? Height { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public int? TrainerId { get; set; }
    public int? GymId { get; set; }
    public decimal? Weight { get; set; }

    public Membership Membership { get; set; }
    public Gym Gym { get; set; }
    public Trainer Trainer { get; set; }

    public ICollection<GroupTrainingUser> GroupTrainingUsers { get; set; }
    public ICollection<IndividualTraining> IndividualTrainings { get; set; }

    public ICollection<Purchase> Purchases { get; set; }
    public ICollection<MealsPerDay> MealsPerDay { get; set; }
}