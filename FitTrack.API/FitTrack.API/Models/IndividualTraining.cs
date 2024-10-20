namespace FitTrack.API.Models;

public class IndividualTraining:Training
{
    public required int UserId { get; set; }      
    public int? TrainerId { get; set; }    
    public required User User { get; set; }
    public required Trainer? Trainer { get; set; }

}