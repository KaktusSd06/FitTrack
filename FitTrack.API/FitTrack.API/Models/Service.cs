namespace FitTrack.API.Models;
public class Service
{
    public required int Id { get; set; }       
    public required string Name { get; set; }         
    public required string Description { get; set; } 
    public required decimal Cost { get; set; }

    public ICollection<Purchase>? Purchases { get; set; }
}