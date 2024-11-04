namespace FitTrack.API.Models;
public class Purchase
{
    public int Id { get; set; } 
    public int ItemId { get; set; }      
    public ItemType ItemType { get; set; }
    public DateTime Date { get; set; }  
    public int Quantity { get; set; }
    
    public string UserId { get; set; }
    public User? User { get; set; }
    
    public Good? Good { get; set; }
    public Service? Service { get; set; }
}

public enum ItemType
{
    Good,
    Service
}