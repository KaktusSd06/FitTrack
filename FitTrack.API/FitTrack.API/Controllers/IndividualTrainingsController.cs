using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndividualTrainingsController : ControllerBase
    {
        private readonly FitTrackDbContext _context;

        public IndividualTrainingsController(FitTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/IndividualTrainings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IndividualTraining>>> GetIndividualTrainings()
        {
            return await _context.IndividualTrainings.ToListAsync();
        }

        // GET: api/IndividualTrainings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IndividualTraining>> GetIndividualTraining(int id)
        {
            var individualTraining = await _context.IndividualTrainings.FindAsync(id);

            if (individualTraining == null)
            {
                return NotFound();
            }

            return individualTraining;
        }
        
        [HttpGet("get-by-userId-and-period/{userId}/{fromDate}/{toDate}")]
        public async Task<IActionResult> GetIndividualTrainingsInfoByUserIdByPeriod(string userId, DateTime fromDate, DateTime toDate)
        {
            fromDate = DateTime.SpecifyKind(fromDate, DateTimeKind.Utc);
            toDate = DateTime.SpecifyKind(toDate, DateTimeKind.Utc);
        
            var individualTrainings = await _context.IndividualTrainings
                .Where(m => m.UserId == userId
                            && m.Date.Date >= fromDate.Date
                            && m.Date.Date <= toDate.Date)
                .ToListAsync();
            if (individualTrainings == null || individualTrainings.Count == 0)
            {
                return NotFound();
            }
            
            return Ok(individualTrainings);
        }

        // PUT: api/IndividualTrainings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIndividualTraining(int id, IndividualTraining individualTraining)
        {
            if (id != individualTraining.Id)
            {
                return BadRequest();
            }

            _context.Entry(individualTraining).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndividualTrainingExists(id))
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

        // POST: api/IndividualTrainings
        [HttpPost]
        public async Task<ActionResult<IndividualTraining>> PostIndividualTraining(IndividualTraining individualTraining)
        {
            await _context.IndividualTrainings.AddAsync(individualTraining);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndividualTraining", new { id = individualTraining.Id }, individualTraining);
        }

        // DELETE: api/IndividualTrainings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIndividualTraining(int id)
        {
            var individualTraining = await _context.IndividualTrainings.FindAsync(id);
            if (individualTraining == null)
            {
                return NotFound();
            }

            _context.IndividualTrainings.Remove(individualTraining);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IndividualTrainingExists(int id)
        {
            return _context.IndividualTrainings.Any(e => e.Id == id);
        }
    }
}
