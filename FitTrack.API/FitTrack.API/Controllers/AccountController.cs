using Microsoft.AspNetCore.Mvc;

namespace FitTrack.API.Controllers;

public class AccountController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}