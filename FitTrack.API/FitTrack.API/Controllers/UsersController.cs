using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;

namespace FitTrack.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(UserManager<Person> userManager) : BasePersonController<User>(userManager)
{
    [HttpPatch("update-additional-info/{userId}")]
    public async Task<IActionResult> UpdateAdditionalInfo(string userId , [FromBody] JsonPatchDocument<User> userPatch)
    {
        if (userPatch == null)
        {
            return BadRequest();
        }
        
        var user = await userManager.FindByIdAsync(userId) as User;
        if (user == null)
        {
            return NotFound();
        }
        
        userPatch.ApplyTo(user);
        
        await userManager.UpdateAsync(user);
        
        return NoContent();
    }

    [HttpGet("get-gym/{userId}")]
    public async Task<IActionResult> GetGym(string userId)
    {
        var user = await userManager.FindByIdAsync(userId) as User;
        if (user == null)
        {
            return NotFound();
        }

        var gym = user.Gym;
        if (gym == null)
        {
            return NotFound();
        }
        
        return Ok(gym);
    }
}
