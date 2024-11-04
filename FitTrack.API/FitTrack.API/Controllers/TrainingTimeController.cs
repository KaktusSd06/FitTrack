using FitTrack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitTrack.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrainingTimeController : Controller
{
    private readonly FitTrackDbContext _context;

    public TrainingTimeController(FitTrackDbContext context)
    {
        _context = context;
    }

    [HttpGet("get-user-training-time-today/{userId}")]
    public async Task<IActionResult> GetUserTrainingTimeToday(string userId)
    {
        var userTrainingTimeToday = await _context.TrainingTimes
            .Where(t => DateTime.Today.Day == t.Date.Day  && t.UserId == userId)
            .ToListAsync();
        
        return Ok(userTrainingTimeToday);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTrainingTimeById(int id)
    {
        var trainingTime = await _context.TrainingTimes.FindAsync(id);
        if (trainingTime == null)
        {
            return NotFound();
        }
        
        return Ok(trainingTime);
    }
    
    [HttpPost]
    public async Task<IActionResult> PostUserTrainingTime(TrainingTime trainingTime)
    {
        _context.TrainingTimes.Add(trainingTime);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction("GetTrainingTimeById", new { id = trainingTime.Id }, trainingTime);
    }

    [HttpPut("update-user-training-time/{userId}")]
    public async Task<IActionResult> UpdateUserTrainingTime(string userId, TrainingTime trainingTime)
    {
        if (trainingTime.UserId != userId)
        {
            return BadRequest();
        }
        
        var trainingTimeToUpdate = await _context.TrainingTimes.FindAsync(trainingTime.Id);
        if (trainingTimeToUpdate == null)
        {
            return NotFound();
        }
        
        _context.Entry(trainingTimeToUpdate).State = EntityState.Modified;
        
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}