namespace FitTrack.API.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Membership
{
    public int Id { get; set; }
    public required string MembershipName { get; set; }
    public required int GymId { get; set; }                 
    public int? Sessions { get; set; }       
    public required int DurationInMonths { get; set; }   
    public required decimal Cost { get; set; }      
    
    public required Gym Gym { get; set; }
    public ICollection<UserMembership> UserMemberships { get; set; }
}