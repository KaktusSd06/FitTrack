namespace FitTrack.API.Models;

public class StepsInfo
{
    public required int Id { get; set; }
    public required int UserId { get; set; }
    public required int Steps { get; set; }
    public required DateTime Date { get; set; }
    public required User User { get; set; }
}
