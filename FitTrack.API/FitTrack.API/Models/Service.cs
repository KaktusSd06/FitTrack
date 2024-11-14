using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Service:Item
{
    public ICollection<Purchase>? Purchases { get; set; }
}