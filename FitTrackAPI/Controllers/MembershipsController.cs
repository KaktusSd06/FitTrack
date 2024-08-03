using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MembershipsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Memberships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Membership>>> GetMemberships()
        {
            return await _context.Memberships.ToListAsync();
        }

        // GET: api/Memberships/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Membership>> GetMembership(int id)
        {
            var membership = await _context.Memberships.FindAsync(id);

            if (membership == null)
            {
                return NotFound();
            }

            return membership;
        }

        // PUT: api/Memberships/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMembership(int id, Membership membership)
        {
            if (id != membership.Id)
            {
                return BadRequest();
            }

            _context.Entry(membership).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembershipExists(id))
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

        // POST: api/Memberships
        [HttpPost]
        public async Task<ActionResult<Membership>> PostMembership(Membership membership)
        {
            _context.Memberships.Add(membership);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMembership", new { id = membership.Id }, membership);
        }

        // DELETE: api/Memberships/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembership(int id)
        {
            var membership = await _context.Memberships.FindAsync(id);
            if (membership == null)
            {
                return NotFound();
            }

            _context.Memberships.Remove(membership);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MembershipExists(int id)
        {
            return _context.Memberships.Any(e => e.Id == id);
        }
    }
}
