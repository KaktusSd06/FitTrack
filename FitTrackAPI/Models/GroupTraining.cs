using FitTrackAPI.Models;

public class GroupTraining : Training
{
	public int GymId { get; set; }
	public int TrainerId { get; set; }
	public DateTime? Date { get; set; }

	public Trainer Trainer { get; set; }
	public Gym Gym { get; set; }

	public ICollection<GroupTrainingUser> GroupTrainingUsers { get; set; }
}