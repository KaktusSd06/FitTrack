using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GymsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Gyms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gym>>> GetGyms()
        {
            return await _context.Gyms.ToListAsync();
        }

        // GET: api/Gyms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gym>> GetGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);

            if (gym == null)
            {
                return NotFound();
            }

            return gym;
        }

        // PUT: api/Gyms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGym(int id, Gym gym)
        {
            if (id != gym.Id)
            {
                return BadRequest();
            }

            _context.Entry(gym).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GymExists(id))
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

        // POST: api/Gyms
        [HttpPost]
        public async Task<ActionResult<Gym>> PostGym(Gym gym)
        {
            _context.Gyms.Add(gym);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGym", new { id = gym.Id }, gym);
        }

        // DELETE: api/Gyms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);
            if (gym == null)
            {
                return NotFound();
            }

            _context.Gyms.Remove(gym);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GymExists(int id)
        {
            return _context.Gyms.Any(e => e.Id == id);
        }
    }
}
