using FitTrack.API.Models;

public class User : Person
{
    public int? Height { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? TrainerId { get; set; }
    public int? GymId { get; set; }

    public Membership? Membership { get; set; }
    public Gym? Gym { get; set; }
    public Trainer? Trainer { get; set; }

    public ICollection<GroupTrainingUser>? GroupTrainingUsers { get; set; }
    public ICollection<IndividualTraining>? IndividualTrainings { get; set; }

    public ICollection<Purchase>? Purchases { get; set; }
    public ICollection<MealsPerDay>? MealsPerDay { get; set; }

    public ICollection<WeightsInfo>? Weights { get; set; }
    public ICollection<StepsInfo>? Steps { get; set; }  
}