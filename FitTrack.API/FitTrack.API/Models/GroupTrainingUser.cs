namespace FitTrack.API.Models;
public class GroupTrainingUser
{
    public required int Id { get; set; }
    public required int TrainingId { get; set; }
    public  required int UserId { get; set; }

    public required User User { get; set; }

    public  required GroupTraining GroupTraining { get; set; }
}