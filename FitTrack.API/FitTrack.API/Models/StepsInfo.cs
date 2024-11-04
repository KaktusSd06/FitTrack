namespace FitTrack.API.Models;

public class StepsInfo
{
    public int Id { get; set; }
    public int Steps { get; set; }
    public DateTime Date { get; set; }
    public string UserId { get; set; }
    public User? User { get; set; }
}
