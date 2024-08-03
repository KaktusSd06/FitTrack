using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupTrainingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GroupTrainingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/GroupTrainings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupTraining>>> GetGroupTrainings()
        {
            return await _context.GroupTrainings.ToListAsync();
        }

        // GET: api/GroupTrainings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupTraining>> GetGroupTraining(int id)
        {
            var groupTraining = await _context.GroupTrainings.FindAsync(id);

            if (groupTraining == null)
            {
                return NotFound();
            }

            return groupTraining;
        }

        // PUT: api/GroupTrainings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroupTraining(int id, GroupTraining groupTraining)
        {
            if (id != groupTraining.Id)
            {
                return BadRequest();
            }

            _context.Entry(groupTraining).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupTrainingExists(id))
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

        // POST: api/GroupTrainings
        [HttpPost]
        public async Task<ActionResult<GroupTraining>> PostGroupTraining(GroupTraining groupTraining)
        {
            _context.GroupTrainings.Add(groupTraining);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroupTraining", new { id = groupTraining.Id }, groupTraining);
        }

        // DELETE: api/GroupTrainings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroupTraining(int id)
        {
            var groupTraining = await _context.GroupTrainings.FindAsync(id);
            if (groupTraining == null)
            {
                return NotFound();
            }

            _context.GroupTrainings.Remove(groupTraining);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GroupTrainingExists(int id)
        {
            return _context.GroupTrainings.Any(e => e.Id == id);
        }
    }
}
