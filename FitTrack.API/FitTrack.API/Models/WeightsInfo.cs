namespace FitTrack.API.Models;

public class WeightsInfo
{
    public required int Id { get; set; }
    public required int UserId { get; set; }
    public required decimal Weight { get; set; }
    public required DateTime Date { get; set; }

    public required User User { get; set; }
}

