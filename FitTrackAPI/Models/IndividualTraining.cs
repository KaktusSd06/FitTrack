public class IndividualTraining
{
    public int Id { get; set; }  
    public int UserId { get; set; }      
    public int TrainerId { get; set; }   
    public string Description { get; set; } 
    public DateTime Date { get; set; }   
    public int GymId { get; set; }
    public Gym Gym { get; set; }

    public User User { get; set; }
    public Trainer Trainer { get; set; }

}