namespace FitTrack.API.Models;

public class IndividualTraining:Training
{
    public string UserId { get; set; } 
    public User? User { get; set; }
    
    public string? TrainerId { get; set; }    
    public Trainer? Trainer { get; set; }
    
    public ICollection<Set>? Sets { get; set; }

    //public ICollection<Exercise>? Exercises { get; set; }
}