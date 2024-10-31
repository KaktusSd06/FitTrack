using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Good:Item
{
    public required string Image { get; set; }     

    public ICollection<Purchase>? Purchases { get; set; }
}
