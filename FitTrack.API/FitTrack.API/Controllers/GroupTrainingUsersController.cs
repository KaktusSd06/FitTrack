using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupTrainingUsersController : ControllerBase
    {
        private readonly FitTrackDbContext _context;

        public GroupTrainingUsersController(FitTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/GroupTrainingUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupTrainingUser>>> GetGroupTrainingUsers()
        {
            return await _context.GroupTrainingUsers.ToListAsync();
        }

        // GET: api/GroupTrainingUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupTrainingUser>> GetGroupTrainingUser(int id)
        {
            var groupTrainingUser = await _context.GroupTrainingUsers.FindAsync(id);

            if (groupTrainingUser == null)
            {
                return NotFound();
            }

            return groupTrainingUser;
        }

        // PUT: api/GroupTrainingUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroupTrainingUser(int id, GroupTrainingUser groupTrainingUser)
        {
            if (id != groupTrainingUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(groupTrainingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupTrainingUserExists(id))
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

        // POST: api/GroupTrainingUsers
        [HttpPost]
        public async Task<ActionResult<GroupTrainingUser>> PostGroupTrainingUser(GroupTrainingUser groupTrainingUser)
        {
            _context.GroupTrainingUsers.Add(groupTrainingUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroupTrainingUser", new { id = groupTrainingUser.Id }, groupTrainingUser);
        }

        // DELETE: api/GroupTrainingUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroupTrainingUser(int id)
        {
            var groupTrainingUser = await _context.GroupTrainingUsers.FindAsync(id);
            if (groupTrainingUser == null)
            {
                return NotFound();
            }

            _context.GroupTrainingUsers.Remove(groupTrainingUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GroupTrainingUserExists(int id)
        {
            return _context.GroupTrainingUsers.Any(e => e.Id == id);
        }
    }
}
