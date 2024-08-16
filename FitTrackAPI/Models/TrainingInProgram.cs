namespace FitTrackAPI.Models
{
    public class TrainingInProgram : Training
    {
     
        public int TrainingProgramId { get; set; }

        public TrainingProgram TrainingProgram { get; set; }
    }
}
