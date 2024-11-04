namespace FitTrack.API.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Membership
{
    public int Id { get; set; }
    public string MembershipName { get; set; }
    public int? Sessions { get; set; }       
    public int DurationInMonths { get; set; }   
    public decimal Cost { get; set; }      
    
    public int GymId { get; set; } 
    public Gym? Gym { get; set; }
    
    public ICollection<UserMembership>? UserMemberships { get; set; }
}