namespace FitTrack.API.Models;

public class UserMembership
{
    public int Id { get; set; }
    public int? SessionsReminded { get; set; }
    public DateOnly ExpirationDate { get; set; } 
    
    public string UserId { get; set; }
    public User? User { get; set; }
    
    public int MembershipId { get; set; }
    public Membership? Membership { get; set; }

    public void InitializeMembershipData(Membership membership)
    {
        if (membership != null)
        {
            SessionsReminded = membership.Sessions;
            ExpirationDate = DateOnly.FromDateTime(DateTime.Now.AddMonths(membership.DurationInMonths));
        }
    }
}