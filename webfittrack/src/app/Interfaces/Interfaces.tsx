// Interfaces.tsx
export const AdminButtonData = [
    {
        text: "Користувачі",
        imageSrc: "/images/user.svg",
        redirectPath: "/pages/admin/users"
    },
    {
        text: "Товари",
        imageSrc: "/images/local-grocery-store.svg",
        redirectPath: "/pages/admin/products"
    },
    {
        text: "Панель",
        imageSrc: "/images/icon-color.png",
        redirectPath: "/pages/admin/dashboard"
    },
    {
        text: "Тренування",
        imageSrc: "/images/mdi-dumbbell.svg",
        redirectPath: "/pages/admin/trainings"
    },
    {
        text: "Транзакції",
        imageSrc: "/images/attach-money.svg",
        redirectPath: "/pages/admin/transactions"
    },
];


export interface Good {
    id: number;
    name?: string;
    description?: string;
    cost: number;
    image?: string;
    purchases?: Purchase[];
}

export interface Gym {
    id: number;
    address?: string;
    name?: string;
    ownerId?: string;
    balance?: number;
    owner?: Owner;
    trainers?: Trainer[];
    admins?: Admin[];
    users?: User[];
    memberships?: Membership[];
    groupTrainings?: GroupTraining[];
}
export interface Admin {
    id?: string; // nullable
    userName?: string; // nullable
    email?: string; // nullable
    emailConfirmed: boolean;
    phoneNumber?: string; // nullable
    firstName: string; // required, minLength: 1, maxLength: 30
    lastName: string; // required, minLength: 1, maxLength: 30
    middleName?: string; // nullable, maxLength: 30
    gymId?: number; // nullable
    gym?: Gym; // nullable, reference to Gym
}
export interface GroupTraining {
    id: number; // required
    description?: string; // nullable
    string: string; // could also use string type for better string handling
    gymId: number; // required
    gym?: Gym; // nullable, reference to Gym
    trainerId?: string; // nullable
    trainer?: Trainer; // nullable, reference to Trainer
    users?: User[]; // nullable, array of User objects
}
export interface Owner {
    id?: string; // nullable
    userName?: string; // nullable
    email?: string; // nullable
    phoneNumber?: string; // nullable
    firstName: string; // обов'язкове поле з мінімальною довжиною 1
    lastName: string; // обов'язкове поле з мінімальною довжиною 1
    middleName?: string; // nullable
    gyms?: Gym[]; // Масив об'єктів Gym (nullable)
}
export interface Membership {
    id: number;
    membershipName?: string; // nullable
    gymId: number;
    sessions?: number; // nullable
    durationInMonths: number;
    cost: number;
    gym: Gym; // об'єкт Gym
    userMemberships?: UserMembership[]; // Масив об'єктів UserMembership (nullable)
}
export interface UserMembership {
    id: number;
    sessionsReminded?: number; // nullable
    expirationDate: string; // або використовуйте DateOnly, якщо це ваш власний тип
    userId?: string; // nullable
    user?: User; // об'єкт User (nullable)
    membershipId: number;
    membership: Membership; // об'єкт Membership
}
export interface User {
    id?: string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    height?: number;
    dateOfBirth?: string;
    trainerId?: string;
    trainer?: Trainer;
    gymId?: number;
    gym?: Gym;
}
export interface TrainingProgram {
    id: number;
    name?: string; // nullable, maxLength: 50
    description?: string; // nullable
    trainerId?: string; // nullable
    isPublic: boolean;
    trainer?: Trainer; // об'єкт Trainer (nullable)
    trainingsInProgram?: TrainingInProgram[]; // масив об'єктів Training (nullable)
}
export interface TrainingInProgram {
    id: number;
    description?: string;
    string: string;
    trainingProgramId: number;
    trainingProgram?: TrainingProgram;
}
export interface Service {
    id: number;
    name?: string;
    description?: string;
    cost: number;
    purchases?: Purchase[];
}

export interface Trainer {
    id?: string;
    userName?: string;
    normalizedUserName?: string;
    email?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    height?: number;
    dateOfBirth?: string;
    trainerId?: string;
    profilePicture: string;
    gymId?: number;
    gym?: Gym;
}

export interface Purchase {
    id: number;
    itemId: number;
    itemType: number;
    string: string;
    quantity: number;
    userId: string;
    user: User;
    service: Service;
}
