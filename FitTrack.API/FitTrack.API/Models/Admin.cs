namespace FitTrack.API.Models;
public class Admin : Person
{
    public int GymId { get; set; }
    public Gym? Gym { get; set; }
}