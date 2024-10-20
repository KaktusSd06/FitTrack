using Microsoft.EntityFrameworkCore;

namespace FitTrack.API
{
    public static class MigrationExtentions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();

            using FitTrackDbContext dbContext = scope.ServiceProvider.GetRequiredService<FitTrackDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
