namespace FitTrack.API.Models;

public class TrainingTime
{
    public int Id { get; set; }
    public TimeSpan Time { get; set; }
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    
    public string UserId { get; set; }
    public User? User { get; set; }
}