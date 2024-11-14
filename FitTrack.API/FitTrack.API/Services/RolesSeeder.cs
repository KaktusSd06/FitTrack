using Microsoft.AspNetCore.Identity;

namespace FitTrack.API.Services;

public class RolesSeeder
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RolesSeeder(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task SeedRolesAsync()
    {
        if (!await _roleManager.RoleExistsAsync("User"))
        {
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }

        if (!await _roleManager.RoleExistsAsync("Owner"))
        {
            await _roleManager.CreateAsync(new IdentityRole("Owner"));
        }

        if (!await _roleManager.RoleExistsAsync("Admin"))
        {
            await _roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        if (!await _roleManager.RoleExistsAsync("Trainer"))
        {
            await _roleManager.CreateAsync(new IdentityRole("Trainer"));
        }
    }
}