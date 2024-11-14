namespace FitTrack.API.Models;
public class MealsPerDay
{
    public int Id { get; set; }            
    public required int MealId { get; set; }        
    public required string UserId { get; set; }        
    public required DateTime DateOfConsumption { get; set; } 

    public required Meal Meal { get; set; }

    public required User User { get; set; }
}