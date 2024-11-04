using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;

public class Exercise
{
	public int Id { get; set; }
	[MaxLength(50)]
	public required string Name { get; set; }
	//public required string Image { get; set; }
	public required string Description { get; set; }
	
	public ICollection<IndividualTraining> IndividualTrainings { get; set; }
	public ICollection<Set>? Sets { get; set; }
}