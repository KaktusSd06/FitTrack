using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Meal
{
    public int Id { get; set; }
    [MaxLength(50)]
    public required string Name { get; set; }
    public required decimal Calories { get; set; } 

    public ICollection<MealsPerDay>? MealsPerDay { get; set; }
}