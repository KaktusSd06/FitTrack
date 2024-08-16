namespace FitTrackAPI.Models
{
    public class TrainingProgram
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TrainerId { get; set; }
        public bool IsPublic { get; set; }

        public Trainer Trainer { get; set; }

        public ICollection<TrainingInProgram> TrainingsInProgram { get; set; }
    }
}
