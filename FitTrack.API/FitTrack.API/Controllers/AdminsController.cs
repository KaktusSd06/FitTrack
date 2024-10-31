using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace FitTrack.API.Controllers;

[Authorize(Roles = "Admin,Owner")]
[Route("api/[controller]")]
[ApiController]
public class AdminsController(UserManager<Person> userManager) : BasePersonController<Admin>(userManager){}
   