using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesInTrainingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExercisesInTrainingController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ExercisesInTraining
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseInTraining>>> GetExercisesInTraining()
        {
            return await _context.ExercisesInTraining.ToListAsync();
        }

        // GET: api/ExercisesInTraining/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExerciseInTraining>> GetExercisesInTraining(int id)
        {
            var exercisesInTraining = await _context.ExercisesInTraining.FindAsync(id);

            if (exercisesInTraining == null)
            {
                return NotFound();
            }

            return exercisesInTraining;
        }

        // PUT: api/ExercisesInTraining/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExercisesInTraining(int id, ExerciseInTraining exercisesInTraining)
        {
            if (id != exercisesInTraining.Id)
            {
                return BadRequest();
            }

            _context.Entry(exercisesInTraining).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExercisesInTrainingExists(id))
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

        // POST: api/ExercisesInTraining
        [HttpPost]
        public async Task<ActionResult<ExerciseInTraining>> PostExercisesInTraining(ExerciseInTraining exercisesInTraining)
        {
            _context.ExercisesInTraining.Add(exercisesInTraining);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExercisesInTraining", new { id = exercisesInTraining.Id }, exercisesInTraining);
        }

        // DELETE: api/ExercisesInTraining/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercisesInTraining(int id)
        {
            var exercisesInTraining = await _context.ExercisesInTraining.FindAsync(id);
            if (exercisesInTraining == null)
            {
                return NotFound();
            }

            _context.ExercisesInTraining.Remove(exercisesInTraining);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExercisesInTrainingExists(int id)
        {
            return _context.ExercisesInTraining.Any(e => e.Id == id);
        }
    }
}
