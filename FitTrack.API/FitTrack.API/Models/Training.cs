namespace FitTrack.API.Models
{
    public abstract class Training
    {
        public required int Id { get; set; }
        public required string Description { get; set; }
        public required DateTime Date { get; set; }
    }
}
