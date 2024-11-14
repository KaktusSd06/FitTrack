using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsPerDaysController : ControllerBase
    {
        private readonly FitTrackDbContext _context;

        public MealsPerDaysController(FitTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/MealsPerDays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealsPerDay>>> GetMealsPerDays()
        {
            return await _context.MealsPerDay.ToListAsync();
        }

        // GET: api/MealsPerDays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealsPerDay>> GetMealsPerDay(int id)
        {
            var mealsPerDay = await _context.MealsPerDay.FindAsync(id);

            if (mealsPerDay == null)
            {
                return NotFound();
            }

            return mealsPerDay;
        }

        // PUT: api/MealsPerDays/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMealsPerDay(int id, MealsPerDay mealsPerDay)
        {
            if (id != mealsPerDay.Id)
            {
                return BadRequest();
            }

            _context.Entry(mealsPerDay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealsPerDayExists(id))
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

        // POST: api/MealsPerDays
        [HttpPost]
        public async Task<ActionResult<MealsPerDay>> PostMealsPerDay(MealsPerDay mealsPerDay)
        {
            _context.MealsPerDay.Add(mealsPerDay);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMealsPerDay", new { id = mealsPerDay.Id }, mealsPerDay);
        }

        // DELETE: api/MealsPerDays/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMealsPerDay(int id)
        {
            var mealsPerDay = await _context.MealsPerDay.FindAsync(id);
            if (mealsPerDay == null)
            {
                return NotFound();
            }

            _context.MealsPerDay.Remove(mealsPerDay);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealsPerDayExists(int id)
        {
            return _context.MealsPerDay.Any(e => e.Id == id);
        }
    }
}
