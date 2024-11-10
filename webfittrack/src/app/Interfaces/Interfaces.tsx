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

export const UserButtonData = [
    {
        text: "Головна",
        imageSrc: "/images/icon-color.png",
        redirectPath: "/pages/User/Main"
    },
    {
        text: "Товари та послуги",
        imageSrc: "/images/local-grocery-store.svg",
        redirectPath: "/pages/User/Products"
    },
    {
        text: "Транзакції",
        imageSrc: "/images/attach-money.svg",
        redirectPath: "/pages/User/Transactions"
    },
];

export const OwnerButtonData = [
    {
        text: "Зали",
        imageSrc: "/images/mdi-dumbbell.svg",
        redirectPath: "/pages/Owner/Gyms"
    },
    {
        text: "Адміни",
        imageSrc: "/images/people.svg",
        redirectPath: "/pages/Owner/Admins"
    },
    {
        text: "Звіти",
        imageSrc: "/images/report.svg",
        redirectPath: "/pages/Owner/Reports"
    },
    {
        text: "Статистика",
        imageSrc: "/images/timeline.svg",
        redirectPath: "/pages/Owner/Statistic"
    },
    {
        text: "Транзакції",
        imageSrc: "/images/attach-money.svg",
        redirectPath: "/pages/Owner/Transactions"
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
    goods?: Good[];
    services?: Service[];
    groupTrainings?: GroupTraining[];
}
export interface Admin {

    id?: string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    gymId?: number;
}
export interface GroupTraining {
    id: number; // required
    description?: string; // nullable
    string: string; // could also use string type for better string handling
    gymId: number; // required
    date: string;
    durationInMinutes: number;
    trainerId?: string; // nullable
    users?: User[];
}
export interface Owner {
    id?: string; // nullable
    userName?: string; // nullable
    email?: string; // nullable
    phoneNumber?: string; // nullable
    firstName: string; // обов'язкове поле з мінімальною довжиною 1
    lastName: string; // обов'язкове поле з мінімальною довжиною 1
    middleName?: string; // nullable
    gyms?: Gym[];
}
export interface Membership {
    id: number;
    membershipName?: string; // nullable
    gymId: number;
    sessions?: number; // nullable
    durationInMonths: number;
    cost: number;
    userMemberships?: UserMembership[];
}
export interface UserMembership {
    id: number;
    sessionsReminded?: number; // nullable
    expirationDate: string; // або використовуйте DateOnly, якщо це ваш власний тип
    userId?: string; // nullable
    membershipId: number;
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
    gymId?: number;
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
}

export interface Purchase {
    id?: number;
    itemId?: number;
    itemType: number;
    date: string;
    quantity?: number;
    userId: string;
    good?: Good,
    service?: Service;
}
