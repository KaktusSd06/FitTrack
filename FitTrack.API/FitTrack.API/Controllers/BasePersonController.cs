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

    [HttpPut("update-email/{id}")]
    public async Task<IActionResult> UpdateEmail(string id, [FromBody] string newEmail)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        var token = await _userManager.GenerateChangeEmailTokenAsync(person, newEmail);
        var result = await _userManager.ChangeEmailAsync(person, newEmail, token);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        await _userManager.SetUserNameAsync(person, newEmail);
        
        return NoContent();
    }

    [HttpPut("update-phone/{id}")]
    public async Task<IActionResult> UpdatePhone(string id, [FromBody] string newPhone)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        var token = await _userManager.GenerateChangePhoneNumberTokenAsync(person, newPhone);
        var result = await _userManager.ChangePhoneNumberAsync(person, newPhone, token);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        return NoContent();
    }

    [HttpPut("update-password/{id}")]
    public async Task<IActionResult> UpdatePassword(string id, [FromBody] string newPassword)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        var removePasswordResult = await _userManager.RemovePasswordAsync(person);
        if (!removePasswordResult.Succeeded)
        {
            return BadRequest(removePasswordResult.Errors);
        }
        
        var setPasswordResult = await _userManager.AddPasswordAsync(person, newPassword);
        if (!setPasswordResult.Succeeded)
        {
            return BadRequest(setPasswordResult.Errors);
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
        };

        if (person is User user)
        {
            user.DateOfBirth = DateTime.SpecifyKind(model.BirthDate.ToDateTime(TimeOnly.MinValue), DateTimeKind.Utc);
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