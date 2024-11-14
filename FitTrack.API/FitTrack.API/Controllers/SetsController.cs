using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetsController : ControllerBase
    {
        private readonly FitTrackDbContext _context;

        public SetsController(FitTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/Sets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Set>>> GetSets()
        {
            return await _context.Sets.ToListAsync();
        }

        // GET: api/Sets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Set>> GetSet(int id)
        {
            var set = await _context.Sets.FindAsync(id);

            if (set == null)
            {
                return NotFound();
            }

            return set;
        }

        // PUT: api/Sets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSet(int id, Set set)
        {
            if (id != set.Id)
            {
                return BadRequest();
            }

            _context.Entry(set).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SetExists(id))
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

        // POST: api/Sets
        [HttpPost]
        public async Task<ActionResult<Set>> PostSet(Set set)
        {
            _context.Sets.Add(set);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSet", new { id = set.Id }, set);
        }

        // DELETE: api/Sets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSet(int id)
        {
            var set = await _context.Sets.FindAsync(id);
            if (set == null)
            {
                return NotFound();
            }

            _context.Sets.Remove(set);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SetExists(int id)
        {
            return _context.Sets.Any(e => e.Id == id);
        }
    }
}
