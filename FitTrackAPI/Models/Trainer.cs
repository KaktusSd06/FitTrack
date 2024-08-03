public class Trainer : Person
{
    public int? GymId { get; set; }
    public Gym Gym { get; set; }

    public ICollection<IndividualTraining> IndividualTrainings { get; set; }
    public ICollection<GroupTraining> GroupTrainings { get; set; }
}