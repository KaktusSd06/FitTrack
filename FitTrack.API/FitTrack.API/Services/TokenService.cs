using System.IdentityModel.Tokens.Jwt;
using System.Text;
using FitTrack.API.Models;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.IdentityModel.Tokens;

namespace FitTrack.API.Services;

public class TokenService
{
    private readonly IDistributedCache _cache;
    private readonly IConfiguration _configuration;

    public TokenService(IDistributedCache cache, IConfiguration configuration)
    {
        _cache = cache;
        _configuration = configuration;
    }

    public async Task<string> GenerateRefreshToken(string userId)
    {
        var refreshToken = Guid.NewGuid().ToString();
        
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(double.Parse(_configuration["Jwt:RefreshExpiryDays"]!))
        };

        await _cache.SetStringAsync(userId, refreshToken, options);
        
        return refreshToken;
    }

    public bool ValidateRefreshToken(string refreshToken)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);

        try
        {
            tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            return jwtToken != null && jwtToken.ValidTo > DateTime.UtcNow;
        }
        catch
        {
            return false;
        }
    }
}