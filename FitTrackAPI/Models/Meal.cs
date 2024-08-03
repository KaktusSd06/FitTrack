public class Meal
{
    public int Id { get; set; }        
    public string Name { get; set; }
    public decimal Calories { get; set; } 

    public ICollection<MealsPerDay> MealsPerDay { get; set; }
}