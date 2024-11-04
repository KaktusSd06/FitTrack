using Microsoft.Build.Framework;

namespace FitTrack.API.Models
{
    public abstract class Training
    {
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
