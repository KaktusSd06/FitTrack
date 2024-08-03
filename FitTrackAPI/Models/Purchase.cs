public class Purchase
{
    public int Id { get; set; } 
    public int ItemId { get; set; }      
    public int UserId { get; set; }     
    public DateTime Date { get; set; }  

    public ItemType ItemType { get; set; } 

    public User User { get; set; }
}

public enum ItemType
{
    Good,
    Service
}