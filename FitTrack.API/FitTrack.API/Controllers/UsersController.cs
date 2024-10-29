using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitTrack.API.Models;
using Microsoft.AspNetCore.Identity;

namespace FitTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<Person> _userManager;

        public UsersController(UserManager<Person> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.GetUsersInRoleAsync("User");

            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("get-by-email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return NotFound();
            }
            
            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("update-basic-info/{id}")]
        public async Task<IActionResult> UpdateUserBasicInfo(string id, [FromBody] Update update)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            if (!await _userManager.IsInRoleAsync(user, "User"))
            {
                return BadRequest("User not in role User");
            }
            
            user.FirstName = update.FirstName;
            user.LastName = update.LastName;
            user.MiddleName = update.MiddleName;
            (user as User).Height = update.Height;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
                
            return NoContent();
        }

        [HttpPut("update-email/{id}")]
        public async Task<IActionResult> UpdateUserEmail(string id,[FromBody]  string email)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            var token = await _userManager.GenerateChangeEmailTokenAsync(user, email);
            
            var result = await _userManager.ChangeEmailAsync(user, email, token);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            
            await _userManager.SetUserNameAsync(user, email);
            
            return NoContent();
        }
        
        [HttpPut("update-password/{id}")]
        public async Task<IActionResult> UpdateUserPassword(string id,[FromBody]  string newPassword)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            var removePasswordResult = await _userManager.RemovePasswordAsync(user);
            if (!removePasswordResult.Succeeded)
            {
                return BadRequest(removePasswordResult.Errors);
            }

            var addPasswordResult = await _userManager.AddPasswordAsync(user, newPassword);
            if (!addPasswordResult.Succeeded)
            {
                return BadRequest(addPasswordResult.Errors);
            }
            
            return NoContent();
        }
        
        [HttpPut("update-phone/{id}")]
        public async Task<IActionResult> UpdateUserPhoneNumber(string id,[FromBody] string phoneNumber)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            var token = await _userManager.GenerateChangePhoneNumberTokenAsync(user, phoneNumber);
            
            var result = await _userManager.ChangePhoneNumberAsync(user, phoneNumber, token);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            
            return NoContent();
        }
        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] Register register)
        {
            var user = new User
            {
                Email = register.Email,
                LastName = register.LastName,
                FirstName = register.FirstName,
                DateOfBirth = DateTime.SpecifyKind(register.BirthDate.ToDateTime(TimeOnly.MinValue), DateTimeKind.Utc),//register.BirthDate.ToDateTime(new TimeOnly()),
                MiddleName = register.MiddleName,
                PhoneNumber = register.PhoneNumber,
                UserName = register.Email
            };
            
            var result = await _userManager.CreateAsync(user, register.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            
            await _userManager.AddToRoleAsync(user, "User");
            return CreatedAtAction("GetUserById", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            
            return NoContent();
        }
    }
}
