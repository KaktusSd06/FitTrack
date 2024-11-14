namespace FitTrack.API.Models
{
    public class TrainingInProgram : Training
    {
     
        public required int TrainingProgramId { get; set; }

        public required TrainingProgram TrainingProgram { get; set; }
    }
}
