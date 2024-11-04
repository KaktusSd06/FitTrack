namespace FitTrack.API.Models;
public class Purchase
{
    public int Id { get; set; } 
    public required int ItemId { get; set; }      
    public required ItemType ItemType { get; set; }
    public required DateTime Date { get; set; }  
    public required int Quantity { get; set; }
    
    public required string UserId { get; set; }
    public required User User { get; set; }
    
    public Good? Good { get; set; }
    public Service? Service { get; set; }
}

public enum ItemType
{
    Good,
    Service
}