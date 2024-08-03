public class Good
{
    public int Id { get; set; }        
    public string Name { get; set; }      
    public string Description { get; set; } 
    public string Image { get; set; }     
    public decimal Cost { get; set; }     

    public ICollection<Purchase> Purchases { get; set; }
}
