using FitTrackAPI.Models;

public class IndividualTraining:Training
{
    public int UserId { get; set; }      
    public int TrainerId { get; set; }   
    public DateTime Date { get; set; }   
    public int GymId { get; set; }
    public Gym Gym { get; set; }

    public User User { get; set; }
    public Trainer Trainer { get; set; }

}