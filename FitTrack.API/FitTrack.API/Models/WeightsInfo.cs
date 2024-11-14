namespace FitTrack.API.Models;

public class WeightsInfo
{
    public int Id { get; set; }
    public double Weight { get; set; }
    public DateTime Date { get; set; }

    public string UserId { get; set; }
    public User? User { get; set; }
}

