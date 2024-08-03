public class Exercise
{
	public int Id { get; set; }
	public string Name { get; set; }
	public string Image { get; set; }
	public string Description { get; set; }

	public ICollection<Set> Sets { get; set; }
	public ICollection<ExerciseInTraining> ExercisesInTraining { get; set; }
}