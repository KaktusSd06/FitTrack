using FitTrack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitTrack.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserMembershipsController : Controller
{
    private readonly FitTrackDbContext _context;

    public UserMembershipsController(FitTrackDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userMemberships = await _context.UserMemberships.ToListAsync();
        
        return Ok(userMemberships);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userMembership = await _context.UserMemberships.FindAsync(id);
        if (userMembership == null)
        {
            return NotFound();
        }
        
        return Ok(userMembership);
    }

    [HttpPost]
    public async Task<IActionResult> Post(UserMembership userMembership)
    {
        var membership = await _context.Memberships.FindAsync(userMembership.MembershipId);
        if (membership == null)
        {
            return NotFound();
        }
        userMembership.InitializeMembershipData(membership);
        await _context.UserMemberships.AddAsync(userMembership);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = userMembership.Id }, userMembership);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, UserMembership userMembership)
    {
        if (id != userMembership.Id)
        {
            return BadRequest();
        }
        
        var existingUserMembership = await _context.UserMemberships.FindAsync(id);
        if (existingUserMembership == null)
        {
            return NotFound();
        }
        
        _context.Entry(existingUserMembership).State = EntityState.Modified;
        
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userMembership = await _context.UserMemberships.FindAsync(id);
        if (userMembership == null)
        {
            return NotFound();
        }
        
        _context.Remove(userMembership);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}