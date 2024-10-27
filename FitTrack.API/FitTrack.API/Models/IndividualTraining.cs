namespace FitTrack.API.Models;

public class IndividualTraining:Training
{
    public required string UserId { get; set; }      
    public string? TrainerId { get; set; }    
    public required User User { get; set; }
    public required Trainer? Trainer { get; set; }

}