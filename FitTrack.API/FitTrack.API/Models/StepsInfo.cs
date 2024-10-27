namespace FitTrack.API.Models;

public class StepsInfo
{
    public int Id { get; set; }
    public required string UserId { get; set; }
    public required int Steps { get; set; }
    public required DateTime Date { get; set; }
    public required User User { get; set; }
}
