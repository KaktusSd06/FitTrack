using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymsController : ControllerBase
    {
        private readonly FitTrackDbContext _context;

        public GymsController(FitTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/Gyms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gym>>> GetGyms()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(_context.Gyms);
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
        
        [HttpGet("get-by-ownerId/{ownerId}")]
        public async Task<IActionResult> GetGymByOwnerId(string ownerId)
        {
            var gyms = await EntityFrameworkQueryableExtensions.ToListAsync(_context.Gyms.Where(g => g.OwnerId == ownerId));
            if (gyms == null)
            {
                return NotFound();
            }

            return Ok(gyms);
        }
        
        [HttpGet("get-by-userId/{userId}")]
        public async Task<IActionResult> GetGymByUserId(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            
            var gym = await _context.Gyms.FindAsync(user.GymId);
            if (gym == null)
            {
                return NotFound();
            }
            
            return Ok(gym);
        }
        
        [HttpGet("get-gyms-by-ownerId/{ownerId}")]
        public async Task<ActionResult<Owner>> GetGymsByOwnerId(string ownerId)
        {
            var owner = await _context.Owners.Include(o => o.Gyms).Where(o => o.Id == ownerId).FirstAsync();
            if (owner == null)
            {
                return NotFound();
            }
        
            var gyms = owner.Gyms;
            if(gyms == null || gyms.Count == 0)
            {
                return NotFound();
            }
        
            return Ok(gyms);
        }
        
        [HttpGet("get-trainers/{gymId}")]
        public async Task<IActionResult> GetTrainers(int gymId)
        {
            var gym = await _context.Gyms.Include(g=> g.Trainers).Where(g => g.Id == gymId).FirstAsync();
            if (gym == null)
            {
                return NotFound();
            }
            
            var trainers = gym.Trainers;
            if (trainers == null)
            {
                return NotFound();
            }
            
            return Ok(trainers);
        }

        [HttpGet("get-memberships/{gymId}")]
        public async Task<IActionResult> GetMemberships(int gymId)
        {
            var gym = await _context.Gyms
                .Include(g => g.Memberships)
                .Where(g => g.Id == gymId)
                .FirstAsync();

            if (gym == null)
            {
                return NotFound();
            }
            
            var memberships = gym.Memberships;
            if (memberships == null || memberships.Count == 0)
            {
                return NotFound();
            }
            
            return Ok(memberships);
        }
        
        [HttpGet("get-goods/{gymId}")]
        public async Task<IActionResult> GetGoods(int gymId)
        {
            var gym = await _context.Gyms
                .Include(g => g.Goods)
                .Where(g => g.Id == gymId)
                .FirstAsync();

            if (gym == null)
            {
                return NotFound();
            }
            
            var goods = gym.Goods;
            if (goods == null || goods.Count == 0)
            {
                return NotFound();
            }
            
            return Ok(goods);
        }
        
        [HttpGet("get-services/{gymId}")]
        public async Task<IActionResult> GetServices(int gymId)
        {
            var gym = await _context.Gyms
                .Include(g => g.Services)
                .Where(g => g.Id == gymId)
                .FirstAsync();

            if (gym == null)
            {
                return NotFound();
            }
            
            var services = gym.Services;
            if (services == null || services.Count == 0)
            {
                return NotFound();
            }
            
            return Ok(services);
        }
        
        [HttpGet("get-admins/{gymId}")]
        public async Task<IActionResult> GetAdmins(int gymId)
        {
            var gym = await _context.Gyms
                .Include(g => g.Admins)
                .Where(g => g.Id == gymId)
                .FirstAsync();

            if (gym == null)
            {
                return NotFound();
            }
            
            var admins = gym.Admins;
            if (admins == null || admins.Count == 0)
            {
                return NotFound();
            }
            
            return Ok(admins);
        }
        
        [HttpGet("get-users/{gymId}")]
        public async Task<IActionResult> GetUsers(int gymId)
        {
            var gym = await _context.Gyms
                .Include(g => g.Users)
                .Where(g => g.Id == gymId)
                .FirstAsync();

            if (gym == null)
            {
                return NotFound();
            }
            
            var users = gym.Users;
            if (users == null || users.Count == 0)
            {
                return NotFound();
            }
            
            return Ok(users);
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
            await _context.Gyms.AddAsync(gym);
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
