using FitTrack.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BasePersonController<TPerson> : ControllerBase where TPerson : Person, new()
{
    protected readonly UserManager<Person> _userManager;

    public BasePersonController(UserManager<Person> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("{personRole}")]
    public async Task<IActionResult> GetAll(string personRole)
    {
        var person = await _userManager.GetUsersInRoleAsync(personRole);
        
        return Ok(person);
    }

    [HttpGet("get-by-id/{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        return Ok(person);
    }

    [HttpGet("get-by-email/{email}")]
    public async Task<IActionResult> GetByEmail(string email)
    {
        var person = await _userManager.FindByEmailAsync(email);
        if (person == null)
        {
            return NotFound();
        }
        
        return Ok(person);
    }

    [HttpPut("update-basic-info/{id}")]
    public async Task<IActionResult> UpdateBasicInfo(string id, [FromBody] Update update)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        person.FirstName = update.FirstName;
        person.LastName = update.LastName;
        person.MiddleName = update.MiddleName;
        if (person is User user)
        {
            user.Height = update.Height;
        }
        
        var result = await _userManager.UpdateAsync(person);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        return NoContent();
    }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Register model)
    {
        var person = new TPerson
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            MiddleName = model.MiddleName,
            Email = model.Email,
            PhoneNumber = model.PhoneNumber,
            UserName = model.Email,
            CreatedAt = DateTime.UtcNow,
        };

        if (person is User user)
        {
            user.DateOfBirth = DateTime.SpecifyKind((DateTime)model.BirthDate?.ToDateTime(TimeOnly.MinValue), DateTimeKind.Utc);
        }
        if (person is Trainer trainer)
        {
            trainer.GymId = model.GymId;
        }
        if (person is Admin admin)
        {
            admin.GymId = (int)model.GymId;
        }
        
        var result = await _userManager.CreateAsync(person, model.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        return CreatedAtAction(nameof(GetById), new { id = person.Id }, person);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        var result = await _userManager.DeleteAsync(person);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        return NoContent();
    }
}