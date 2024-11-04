using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;

public class UserRole
{
    [Required]
    [EmailAddress]
    public string UserEmail { get; set; }
    [Required]
    public string Role { get; set; }
}