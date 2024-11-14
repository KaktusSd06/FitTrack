using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;
using Microsoft.AspNetCore.Identity;

namespace FitTrack.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrainersController(UserManager<Person> userManager) : BasePersonController<Trainer>(userManager)
{
    [HttpGet("get-by-userId/{userId}")]
    public async Task<IActionResult> GetTrainerByUserId(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId) as User;
        if (user == null)
        {
            return NotFound();
        }
            
        var trainer = await _userManager.FindByIdAsync(user.TrainerId) as Trainer;
        if (trainer == null)
        {
            return NotFound();
        }

        return Ok(trainer);
    }
}
