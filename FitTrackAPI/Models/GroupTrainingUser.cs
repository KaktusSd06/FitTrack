public class GroupTrainingUser
{
    public int Id { get; set; }
    public int TrainingId { get; set; }
    public int UserId { get; set; }

    public User User { get; set; }

    public GroupTraining GroupTraining { get; set; }
}