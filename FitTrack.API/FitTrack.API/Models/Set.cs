namespace FitTrack.API.Models;
public class Set
{
    public int Id { get; set; }       
    public required int ExerciseId { get; set; }  
    public required decimal Weight { get; set; }  
    public required int Reps { get; set; }    
    
    public required Exercise Exercise { get; set; }
}