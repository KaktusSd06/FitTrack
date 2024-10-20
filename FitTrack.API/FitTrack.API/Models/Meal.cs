namespace FitTrack.API.Models;
public class Meal
{
    public required int Id { get; set; }        
    public required string Name { get; set; }
    public required decimal Calories { get; set; } 

    public ICollection<MealsPerDay>? MealsPerDay { get; set; }
}