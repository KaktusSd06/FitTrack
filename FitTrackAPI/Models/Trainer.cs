using FitTrackAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Trainer : Person
{
    public int? Gym_Id { get; set; }
    public Gym? Gym { get; set; }
    public ICollection<User> Users { get; set; }

    public ICollection<IndividualTraining> IndividualTrainings { get; set; }
    public ICollection<GroupTraining> GroupTrainings { get; set; }
    public ICollection<TrainingProgram> TrainingPrograms { get; set; }
}