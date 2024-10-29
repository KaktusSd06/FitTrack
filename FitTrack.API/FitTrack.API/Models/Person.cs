using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Identity;

namespace FitTrack.API.Models;
public class Person : IdentityUser
{
    [MaxLength(30)]
    public required string FirstName { get; set; }
    [MaxLength(30)]
    public required string LastName { get; set; }
    [MaxLength(30)]
    public string? MiddleName { get; set; }
    public DateTime? CreatedAt { get; set; }
}