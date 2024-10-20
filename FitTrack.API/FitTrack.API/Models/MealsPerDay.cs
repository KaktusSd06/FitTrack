namespace FitTrack.API.Models;
public class MealsPerDay
{
    public required int Id { get; set; }            
    public required int MealId { get; set; }        
    public required int UserId { get; set; }        
    public required DateTime DateOfConsumption { get; set; } 

    public required Meal Meal { get; set; }

    public required User User { get; set; }
}