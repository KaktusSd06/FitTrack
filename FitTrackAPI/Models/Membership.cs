using System.ComponentModel.DataAnnotations.Schema;

public class Membership
{
    public int Id { get; set; }
    [ForeignKey("User")]
    public int UserId { get; set; }                
    public int GymId { get; set; }                 
    public int SessionsRemind { get; set; }       
    public DateTime ExpirationDate { get; set; }   
    public decimal Cost { get; set; }      

    public User User { get; set; }           
    public Gym Gym { get; set; }
}