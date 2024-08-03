public class ExerciseInTraining
{
    public int Id { get; set; }          
    public int TrainingId { get; set; }  
    public int ExerciseId { get; set; } 
    public int UserId { get; set; }      

    public Exercise Exercise { get; set; }
    public IndividualTraining IndividualTraining { get; set; }    
    public User User { get; set; }
}