namespace FitTrack.API.Models;
public class Admin : Person
{
    public required int GymId { get; set; }
    public required Gym Gym { get; set; }
}