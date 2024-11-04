﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FitTrack.API.Models;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FitTrack.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : Controller
{
    private readonly UserManager<Person> _userManager;
    private readonly SignInManager<Person> _signInManager;
    private readonly IConfiguration _configuration;

    public AccountController(UserManager<Person> userManager, SignInManager<Person> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    /*[HttpGet("login-google")]
    public async Task<IActionResult> LoginWithGoogle()
    {
        var redirectUrl = Url.Action("GoogleResponse", "Account", null, Request.Scheme);
        var properties = _signInManager.ConfigureExternalAuthenticationProperties("Google", redirectUrl);
        
        return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("signin-google")]
    public async Task<IActionResult> GoogleResponse()
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();

        if (info == null)
        {
            return Unauthorized();
        }
        
        var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);

        if (result.Succeeded)
        {
            var loginUser = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            var token = GenerateJwtToken(loginUser);
            
            return Ok(new { Token = token });
        }
        
        var email = info.Principal.FindFirst(ClaimTypes.Email)?.Value;
        var newUser = new Person
        {
            UserName = email,
            Email = email,
            FirstName = string.Empty,
            LastName = string.Empty,
            CreatedAt = DateTime.UtcNow,
        };
        var creationResult = await _userManager.CreateAsync(newUser);
        
        if (creationResult.Succeeded)
        {
            await _userManager.AddLoginAsync(newUser, info);
            var token = GenerateJwtToken(newUser);
            
            return Ok(new { Token = token });
        }
        
        return BadRequest(creationResult.Errors);
    }*/

    [HttpPost("login-google")]
    public async Task<IActionResult> GoogleLogin([FromBody] string googleToken)
    {
        var payload = await ValidateGoogleToken(googleToken);
        if (payload is null)
        {
            return Unauthorized();
        }
        
        var user = await FindOrCreateUser(payload);
        
        var jwtToken = GenerateJwtToken(user);
        return Ok(new { token = jwtToken });
    }

    [HttpPost("validate-google-token")]
    public async Task<GoogleJsonWebSignature.Payload> ValidateGoogleToken(string googleToken)
    {
        var settings = new GoogleJsonWebSignature.ValidationSettings()
        {
            Audience = new List<string>() {_configuration["Google:ClientId"]!},
        };

        try
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(googleToken, settings);
            return payload;
        }
        catch
        {
            return null;
        }
    }
    [HttpPost("find-or-create-user")]
    public async Task<Person> FindOrCreateUser(GoogleJsonWebSignature.Payload payload)
    {
        var email = payload.Email;
        var user = await _userManager.FindByEmailAsync(email);
        if (user != null)
        {
            return user;
        }
        
        var newUser = new Person
        {
            UserName = email,
            Email = email,
            FirstName = string.Empty,
            LastName = string.Empty,
            CreatedAt = DateTime.UtcNow,
        };
        
        var creationResult = await _userManager.CreateAsync(newUser);
        if (!creationResult.Succeeded)
        {
            return null;
        }
        
        return await _userManager.FindByIdAsync(newUser.Id);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        
        if (user == null)
        {
            return NotFound();
        }
        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return Unauthorized();
        }
        
        var token = GenerateJwtToken(user);
        
        return Ok(new { Token = token });
        
        /*var userRoles = await _userManager.GetRolesAsync(user);
        
        var authClaims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Sub, user.Email!),
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

        };
        
        authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpiryMinutes"]!)),
            claims: authClaims,
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)),
                SecurityAlgorithms.HmacSha256)
        );
        
        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });*/
    }

    [HttpPost("assign-role")]
    public async Task<IActionResult> AssignRole([FromBody] UserRole role)
    {
        var user = await _userManager.FindByEmailAsync(role.UserEmail);

        if (user == null)
        {
            return NotFound();
        }
        
        var result = await _userManager.AddToRoleAsync(user, role.Role);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        return Ok();
    }
    
    [HttpPost("remove-role")]
    public async Task<IActionResult> RemoveRole([FromBody] UserRole role)
    {
        var user = await _userManager.FindByEmailAsync(role.UserEmail);

        if (user == null)
        {
            return NotFound();
        }
        
        var result = await _userManager.RemoveFromRoleAsync(user, role.Role);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        return Ok();
    }
    
    [HttpGet("generate-token")]
    public async Task<IActionResult> GenerateJwtToken(Person user)
    {
        var userRoles = await _userManager.GetRolesAsync(user);
        
        var authClaims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Sub, user.Email!),
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

        };
        
        authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpiryMinutes"]!)),
            claims: authClaims,
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)),
                SecurityAlgorithms.HmacSha256)
        );
        
        return Ok(new{Token = new JwtSecurityTokenHandler().WriteToken(token)});
    }
}