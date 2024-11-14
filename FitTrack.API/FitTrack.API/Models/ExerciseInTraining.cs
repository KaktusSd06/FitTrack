namespace FitTrack.API.Models;
public class ExerciseInTraining
{
    public int Id { get; set; }          
    public required int TrainingId { get; set; }  
    public required int ExerciseId { get; set; }  
    public required Exercise Exercise { get; set; }
    public required TrainingType TrainingType { get; set; }    
}


public enum TrainingType
{
    Individual,
    ForProgram
}