namespace FitTrack.API.Models;

public class Exercise
{
	public required int Id { get; set; }
	public required string Name { get; set; }
	public required string Image { get; set; }
	public required string Description { get; set; }

	public ICollection<Set>? Sets { get; set; }
	public ICollection<ExerciseInTraining>? ExercisesInTraining { get; set; }
}