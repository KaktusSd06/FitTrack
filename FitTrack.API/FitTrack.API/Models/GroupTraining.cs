namespace FitTrack.API.Models;

public class GroupTraining : Training
{
	public required int GymId { get; set; }
	public required int TrainerId { get; set; }
	public required Trainer Trainer { get; set; }
	public required Gym Gym { get; set; }

	public ICollection<GroupTrainingUser>? GroupTrainingUsers { get; set; }
}