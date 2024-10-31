using Microsoft.AspNetCore.Mvc;

namespace FitTrack.API.Controllers;

public class UserMembershipsController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}