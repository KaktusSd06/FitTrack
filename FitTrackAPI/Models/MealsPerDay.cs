public class MealsPerDay
{
    public int Id { get; set; }            
    public int MealId { get; set; }        
    public int UserId { get; set; }        
    public DateTime DateOfConsumption { get; set; } 

    public Meal Meal { get; set; }

    public User User { get; set; }
}