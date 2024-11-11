export interface IndTraining {
  userId: string; // User ID, should be a string (UUID format in your example)
  user: unknown | null; // 'user' can be any type, but can also be null
  trainerId: string | null; // 'trainerId' can be a string (if assigned) or null
  trainer: unknown | null; // 'trainer' can be any type, but can also be null
  sets: unknown | null; // 'sets' can be any type (likely an array or object), or null
  id: number; // 'id' is a number (in your example, it's 1)
  description: string; // 'description' is a string (for example, "Особисте тренування")
  date: string; // 'date' is a string (ISO 8601 formatted date)
}
