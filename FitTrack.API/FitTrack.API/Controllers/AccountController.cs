using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FitTrack.API.Models;
using FitTrack.API.Services;
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
    private readonly TokenService _tokenService;
    private readonly IConfiguration _configuration;

    public AccountController(UserManager<Person> userManager, TokenService tokenService, IConfiguration configuration)
    {
        _userManager = userManager;
        _tokenService = tokenService;
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

    /*[HttpPost("login-google")]
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
    }*/
    
    [HttpPut("update-email/{id}")]
    public async Task<IActionResult> UpdateEmail(string id, [FromBody] string newEmail)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        var token = await _userManager.GenerateChangeEmailTokenAsync(person, newEmail);
        var result = await _userManager.ChangeEmailAsync(person, newEmail, token);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        await _userManager.SetUserNameAsync(person, newEmail);
        
        return NoContent();
    }

    [HttpPut("update-phone/{id}")]
    public async Task<IActionResult> UpdatePhone(string id, [FromBody] string newPhone)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        var token = await _userManager.GenerateChangePhoneNumberTokenAsync(person, newPhone);
        var result = await _userManager.ChangePhoneNumberAsync(person, newPhone, token);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        return NoContent();
    }

    [HttpPut("update-password/{id}")]
    public async Task<IActionResult> UpdatePassword(string id, [FromBody] string newPassword)
    {
        var person = await _userManager.FindByIdAsync(id);
        if (person == null)
        {
            return NotFound();
        }
        
        var removePasswordResult = await _userManager.RemovePasswordAsync(person);
        if (!removePasswordResult.Succeeded)
        {
            return BadRequest(removePasswordResult.Errors);
        }
        
        var setPasswordResult = await _userManager.AddPasswordAsync(person, newPassword);
        if (!setPasswordResult.Succeeded)
        {
            return BadRequest(setPasswordResult.Errors);
        }
        
        return NoContent();
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
        
        var token = GenerateJwtTokens(user).Result;
        
        return Ok(new
        {
            AccessToken = token.First(),
            RefreshToken = token.Last()
        });
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
    
    [HttpGet("get-all-roles/{userId}")]
    public async Task<IActionResult> GetAllRoles(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return NotFound();
        }
        
        var result = await _userManager.GetRolesAsync(user);

        return Ok(result);
    }

    [HttpGet("generate-tokens")]
    public async Task<IEnumerable<string>> GenerateJwtTokens(Person user)
    {
        var accessToken = GenerateJwtToken(user, _configuration["Jwt:AccessExpiryMinutes"]!);
        var refreshToken = GenerateJwtToken(user, _configuration["Jwt:RefreshExpiryDays"]!);
        
        return [
            accessToken,
            refreshToken,
        ];
    }
    
    [HttpGet("generate-token")]
    public string GenerateJwtToken(Person user, string expiry)
    {
        var authClaims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Sub, user.Email!),
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (ClaimTypes.NameIdentifier, user.Id),
        };

        var userRoles = _userManager.GetRolesAsync(user).Result;
        authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: DateTime.UtcNow.AddMinutes(double.Parse(expiry)),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPost("refresh-tokens")]
    public async Task<IActionResult> RefreshTokens(string userId, string refreshToken)
    {
        if (string.IsNullOrEmpty(refreshToken))
        {
            return BadRequest("Invalid refresh token");
        }
        
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return BadRequest("Invalid userId");
        }
        
        var isValid = _tokenService.ValidateRefreshToken(refreshToken);
        if (!isValid)
        {
            return Unauthorized();
        }
        
        var newAccessToken = GenerateJwtToken(user, _configuration["Jwt:AccessExpiryMinutes"]!);

        return Ok(new
        {
            AccessToken = newAccessToken,
            RefreshToken = refreshToken,
        });
    }
}