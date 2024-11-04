﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;
using FitTrack.API;

[ApiController]
[Route("api/[controller]")]
public class StepsInfoController : ControllerBase
{
    private readonly FitTrackDbContext _context;

    public StepsInfoController(FitTrackDbContext context)
    {
        _context = context;
    }

    // GET: api/StepsInfo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StepsInfo>>> GetStepsInfos()
    {
        return await _context.Steps.Include(s => s.User).ToListAsync();
    }

    // GET: api/StepsInfo/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<StepsInfo>> GetStepsInfo(int id)
    {
        var stepsInfo = await _context.Steps.Include(s => s.User)
                                .FirstOrDefaultAsync(s => s.Id == id);

        if (stepsInfo == null)
        {
            return NotFound();
        }

        return stepsInfo;
    }

    // POST: api/StepsInfo
    [HttpPost]
    public async Task<ActionResult<StepsInfo>> PostStepsInfo(StepsInfo stepsInfo)
    {
        _context.Steps.Add(stepsInfo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStepsInfo), new { id = stepsInfo.Id }, stepsInfo);
    }

    // PUT: api/StepsInfo/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStepsInfo(int id, StepsInfo stepsInfo)
    {
        if (id != stepsInfo.Id)
        {
            return BadRequest();
        }

        _context.Entry(stepsInfo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!StepsInfoExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/StepsInfo/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStepsInfo(int id)
    {
        var stepsInfo = await _context.Steps.FindAsync(id);
        if (stepsInfo == null)
        {
            return NotFound();
        }

        _context.Steps.Remove(stepsInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool StepsInfoExists(int id)
    {
        return _context.Steps.Any(e => e.Id == id);
    }
}