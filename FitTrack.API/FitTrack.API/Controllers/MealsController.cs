using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly FitTrackDbContext _context;

        public MealsController(FitTrackDbContext context)
        {
            _context = context;
        }

        // GET: api/Meals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meal>>> GetMeals()
        {
            return await _context.Meals.ToListAsync();
        }

        // GET: api/Meals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetMeal(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return NotFound();
            }

            return meal;
        }

        [HttpGet("get-by-userId-and-day/{userId}/{date}")]
        public async Task<IActionResult> GetMealsByUserIdByDay(string userId, DateTime date)
        {
            date = DateTime.SpecifyKind(date, DateTimeKind.Utc);
            
            var meals = await _context.Meals
                .Where(m => m.UserId == userId && m.DateOfConsumption.Date == date.Date)
                .ToListAsync();
            if (meals == null)
            {
                return NotFound();
            }
            
            //var result = meals.Select(m => new { name = m.Name });
            
            return Ok(meals);
        }
        
        [HttpGet("get-calories-by-userId-and-period/{userId}/{fromDate}/{toDate}")]
        public async Task<IActionResult> GetMealsByUserIdByPeriod(string userId, DateTime fromDate, DateTime toDate)
        {
            fromDate = DateTime.SpecifyKind(fromDate, DateTimeKind.Utc);
            toDate = DateTime.SpecifyKind(toDate, DateTimeKind.Utc);
            
            var meals = await _context.Meals
                .Where(m => m.UserId == userId
                            && m.DateOfConsumption.Date >= fromDate.Date
                            && m.DateOfConsumption.Date <= toDate.Date)
                .GroupBy(m => m.DateOfConsumption.Date)
                .Select(g => new
                {
                    Date = g.Key.ToString("dd/MM/yyyy"),
                    TotalCalories = g.Sum(m => m.Calories)
                })
                .ToListAsync();
            if (meals == null || meals.Count == 0)
            {
                return NotFound();
            }
            
            var result = meals.Select(m => new { date = m.Date, calories = m.TotalCalories });
            
            return Ok(result);
        }

        // PUT: api/Meals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(int id, Meal meal)
        {
            if (id != meal.Id)
            {
                return BadRequest();
            }

            _context.Entry(meal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealExists(id))
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

        // POST: api/Meals
        [HttpPost]
        public async Task<ActionResult<Meal>> PostMeal(Meal meal)
        {
            await _context.Meals.AddAsync(meal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeal", new { id = meal.Id }, meal);
        }

        // DELETE: api/Meals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeal(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return NotFound();
            }

            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealExists(int id)
        {
            return _context.Meals.Any(e => e.Id == id);
        }
    }
}
