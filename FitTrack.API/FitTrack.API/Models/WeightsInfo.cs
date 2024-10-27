namespace FitTrack.API.Models;

public class WeightsInfo
{
    public int Id { get; set; }
    public required string UserId { get; set; }
    public required decimal Weight { get; set; }
    public required DateTime Date { get; set; }

    public required User User { get; set; }
}

