public class Set
{
    public int Id { get; set; }       
    public int ExerciseId { get; set; }  
    public decimal Weight { get; set; }  
    public int Reps { get; set; }    
    
    public Exercise Exercise { get; set; }
}