public class ExerciseInTraining
{
    public int Id { get; set; }          
    public int TrainingId { get; set; }  
    public int ExerciseId { get; set; }  
    public Exercise Exercise { get; set; }
    public TrainigType TrainigType { get; set; }    
}


public enum TrainigType
{
    Individual,
    ForProgram
}