using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Meal
{
    public int Id { get; set; }
    [MaxLength(50)]
    public required string Name { get; set; }
    public required decimal Calories { get; set; } 
    public required DateTime DateOfConsumption { get; set; } 

    public required string UserId { get; set; } 
    public required User User { get; set; }
}