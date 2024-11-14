﻿using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models
{
    public class TrainingProgram
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string TrainerId { get; set; }
        public required bool IsPublic { get; set; }

        public required Trainer Trainer { get; set; }

        public ICollection<TrainingInProgram>? TrainingsInProgram { get; set; }
    }
}
