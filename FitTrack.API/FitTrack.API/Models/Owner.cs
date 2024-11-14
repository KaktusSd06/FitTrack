namespace FitTrack.API.Models;
public class Owner : Person
{
    public ICollection<Gym>? Gyms { get; set; }
}