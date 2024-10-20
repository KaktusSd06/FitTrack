namespace FitTrack.API.Models;
public abstract class Person
{
    public required int Id { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string MiddleName { get; set; }
    public DateTime? CreatedAt { get; set; }
    public required string PhoneNumber { get; set; }
}