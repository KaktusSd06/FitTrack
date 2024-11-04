using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;

public class Item
{
    public int Id { get; set; }
    [MaxLength(50)]
    [Required]
    public string Name { get; set; }     
    [Required]
    public string Description { get; set; } 
    public decimal Cost { get; set; }  
}