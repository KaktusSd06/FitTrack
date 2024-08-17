using Microsoft.AspNetCore.Mvc;

namespace FitTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FitTrackAPIController : ControllerBase
    {
        // Приклад дії для отримання даних
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("FitTrack API is working!");
        }
    }
}
