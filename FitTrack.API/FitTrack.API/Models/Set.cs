namespace FitTrack.API.Models;
public class Set
{
    public int Id { get; set; }       
    public double Weight { get; set; }  
    public int Reps { get; set; }  
    
    public int ExerciseId { get; set; }  
    public Exercise? Exercise { get; set; }
    
    public int IndividualTrainingId { get; set; }  
    public IndividualTraining? IndividualTraining { get; set; }
}