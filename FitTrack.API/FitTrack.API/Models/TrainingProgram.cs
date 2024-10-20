namespace FitTrack.API.Models
{
    public class TrainingProgram
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int TrainerId { get; set; }
        public required bool IsPublic { get; set; }

        public required Trainer Trainer { get; set; }

        public ICollection<TrainingInProgram>? TrainingsInProgram { get; set; }
    }
}
