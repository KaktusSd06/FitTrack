using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Good:Item
{
    public string? Image { get; set; }     
    public ICollection<Purchase>? Purchases { get; set; }
}
