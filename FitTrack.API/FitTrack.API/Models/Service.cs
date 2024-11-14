using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Service:Item
{
    public int GymId { get; set; }
    public Gym? Gym { get; set; }
    public ICollection<Purchase>? Purchases { get; set; }
}