using Microsoft.AspNetCore.Mvc;
using FitTrack.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingProgramsController : ControllerBase
    {
        private readonly FitTrackDbContext _context;

        public TrainingProgramsController(FitTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/TrainingProgram
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainingProgram>>> GetTrainingPrograms()
        {
            return await _context.TrainingPrograms.ToListAsync();
        }

        // GET: api/TrainingProgram/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrainingProgram>> GetTrainingProgram(int id)
        {
            var trainingProgram = await _context.TrainingPrograms.FindAsync(id);

            if (trainingProgram == null)
            {
                return NotFound();
            }

            return trainingProgram;
        }

        // POST: api/TrainingProgram
        [HttpPost]
        public async Task<ActionResult<TrainingProgram>> PostTrainingProgram(TrainingProgram trainingProgram)
        {
            _context.TrainingPrograms.Add(trainingProgram);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrainingProgram), new { id = trainingProgram.Id }, trainingProgram);
        }

        // PUT: api/TrainingProgram/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainingProgram(int id, TrainingProgram trainingProgram)
        {
            if (id != trainingProgram.Id)
            {
                return BadRequest();
            }

            _context.Entry(trainingProgram).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainingProgramExists(id))
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

        // DELETE: api/TrainingProgram/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainingProgram(int id)
        {
            var trainingProgram = await _context.TrainingPrograms.FindAsync(id);
            if (trainingProgram == null)
            {
                return NotFound();
            }

            _context.TrainingPrograms.Remove(trainingProgram);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainingProgramExists(int id)
        {
            return _context.TrainingPrograms.Any(e => e.Id == id);
        }
    }
}
