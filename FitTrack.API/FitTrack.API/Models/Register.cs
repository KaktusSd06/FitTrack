using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;

public class Register
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    [Required] 
    [Compare("ConfirmedPassword")]
    public string Password { get; set; }
    [Required] 
    public string ConfirmedPassword { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }

    public string MiddleName { get; set; } = string.Empty;
    public DateOnly? BirthDate { get; set; }
    public int? GymId { get; set; }
   
}