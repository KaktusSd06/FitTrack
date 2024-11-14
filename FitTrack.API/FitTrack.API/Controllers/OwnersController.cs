﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;
using Microsoft.AspNetCore.Identity;

namespace FitTrack.API.Controllers;


[Route("api/[controller]")]
[ApiController]
public class OwnersController(UserManager<Person> userManager) : BasePersonController<Owner>(userManager){}
    