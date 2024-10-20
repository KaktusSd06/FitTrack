namespace FitTrack.API.Models;
public class Good
{
    public required int Id { get; set; }        
    public required string Name { get; set; }      
    public required string Description { get; set; } 
    public required string Image { get; set; }     
    public required decimal Cost { get; set; }     

    public ICollection<Purchase>? Purchases { get; set; }
}
