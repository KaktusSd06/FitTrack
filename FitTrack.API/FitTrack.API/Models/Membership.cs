namespace FitTrack.API.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Membership
{
    public int Id { get; set; }
    [ForeignKey("User")]
    public required string UserId { get; set; }                
    public required int GymId { get; set; }                 
    public required int SessionsRemind { get; set; }       
    public required DateTime ExpirationDate { get; set; }   
    public required decimal Cost { get; set; }      

    public required User User { get; set; }           
    public required Gym Gym { get; set; }
}