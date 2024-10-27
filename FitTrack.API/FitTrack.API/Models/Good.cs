using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Good
{
    public int Id { get; set; }
    [MaxLength(50)]
    public required string Name { get; set; }     
    public required string Description { get; set; } 
    public required string Image { get; set; }     
    public required decimal Cost { get; set; }     

    public ICollection<Purchase>? Purchases { get; set; }
}
