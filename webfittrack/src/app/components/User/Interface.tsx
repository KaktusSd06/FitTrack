export interface GroupTraining {
    id: number;
    description?: string;
    contactPhone: string;
    gymId: number;
    date: string;
    durationInMinutes: number;
    trainerId?: string; // nullable
    users?: User[];
}