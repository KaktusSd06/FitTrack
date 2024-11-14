﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API;
using FitTrack.API.Models;

[ApiController]
[Route("api/[controller]")]
public class WeightsInfoController : ControllerBase
{
    private readonly FitTrackDbContext _context;

    public WeightsInfoController(FitTrackDbContext context)
    {
        _context = context;
    }

    // GET: api/WeightsInfo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WeightsInfo>>> GetWeightInfos()
    {
        return await _context.Weights.Include(w => w.User).ToListAsync();
    }

    // GET: api/WeightsInfo/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<WeightsInfo>> GetWeightInfo(int id)
    {
        var weightInfo = await _context.Weights.Include(w => w.User)
                              .FirstOrDefaultAsync(w => w.Id == id);

        if (weightInfo == null)
        {
            return NotFound();
        }

        return weightInfo;
    }

    // POST: api/WeightsInfo
    [HttpPost]
    public async Task<ActionResult<WeightsInfo>> PostWeightInfo(WeightsInfo weightInfo)
    {
        await _context.Weights.AddAsync(weightInfo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetWeightInfo), new { id = weightInfo.Id }, weightInfo);
    }

    // PUT: api/WeightsInfo/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutWeightInfo(int id, WeightsInfo weightInfo)
    {
        if (id != weightInfo.Id)
        {
            return BadRequest();
        }

        _context.Entry(weightInfo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!WeightInfoExists(id))
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

    // DELETE: api/WeightsInfo/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWeightInfo(int id)
    {
        var weightInfo = await _context.Weights.FindAsync(id);
        if (weightInfo == null)
        {
            return NotFound();
        }

        _context.Weights.Remove(weightInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool WeightInfoExists(int id)
    {
        return _context.Weights.Any(e => e.Id == id);
    }
}
