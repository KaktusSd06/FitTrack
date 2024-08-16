using Microsoft.AspNetCore.Mvc;
using FitTrackAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FitTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingsInProgramController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TrainingsInProgramController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TrainingInProgram
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainingInProgram>>> GetTrainingsInProgram()
        {
            return await _context.TrainingsInProgram.ToListAsync();
        }

        // GET: api/TrainingInProgram/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrainingInProgram>> GetTrainingInProgram(int id)
        {
            var trainingInProgram = await _context.TrainingsInProgram.FindAsync(id);

            if (trainingInProgram == null)
            {
                return NotFound();
            }

            return trainingInProgram;
        }

        // POST: api/TrainingInProgram
        [HttpPost]
        public async Task<ActionResult<TrainingInProgram>> PostTrainingInProgram(TrainingInProgram trainingInProgram)
        {
            _context.TrainingsInProgram.Add(trainingInProgram);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrainingInProgram), new { id = trainingInProgram.Id }, trainingInProgram);
        }

        // PUT: api/TrainingInProgram/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainingInProgram(int id, TrainingInProgram trainingInProgram)
        {
            if (id != trainingInProgram.Id)
            {
                return BadRequest();
            }

            _context.Entry(trainingInProgram).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainingInProgramExists(id))
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

        // DELETE: api/TrainingInProgram/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainingInProgram(int id)
        {
            var trainingInProgram = await _context.TrainingsInProgram.FindAsync(id);
            if (trainingInProgram == null)
            {
                return NotFound();
            }

            _context.TrainingsInProgram.Remove(trainingInProgram);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainingInProgramExists(int id)
        {
            return _context.TrainingsInProgram.Any(e => e.Id == id);
        }
    }
}
