namespace FitTrack.API.Models;

public class GroupTraining : Training
{
	public int DurationInMinutes { get; set; }
	public string ContactPhone { get; set; }
	
	public int GymId { get; set; }
	public Gym? Gym { get; set; }
	
	public string TrainerId { get; set; }
	public Trainer? Trainer { get; set; }

	public ICollection<User>? Users { get; set; }
}