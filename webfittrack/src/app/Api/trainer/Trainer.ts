import { Trainer } from "@/app/Interfaces/Interfaces";
const BASE_URL = "/api/proxy/Trainers";
export interface BasicInfo {
    firstName?: string;
    lastName?: string;
    middleName?:string;
    height?: number;
  }
  export interface UpdateTrainer {
    id: string;
    basicInfo: BasicInfo;
  }
  export interface RegisterTrainer {
    email: string;                  
    phoneNumber: string;             
    password: string;                
    confirmedPassword: string;      
    firstName: string;               
    lastName: string;               
    middleName?: string | null;      
    birthDate: string;               
    gymId?: number | null;           
           
  }
export const getTrainerByUserId = async (userId: string): Promise<Trainer | null> => {
    const response = await fetch(`${BASE_URL}/${userId}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  };
  
  // Функція для отримання тренера за роллю
  export const getTrainerByRole = async (personRole: string): Promise<Trainer | null> => {
    const response = await fetch(`${BASE_URL}/${personRole}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  };
  
  // Функція для оновлення базової інформації тренера
  export const updateTrainerInfo = async (id: string, data: UpdateTrainer): Promise<void> => {
    await fetch(`${BASE_URL}/update-basic-info/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };
  
  // Функція для реєстрації нового тренера
  export const registerTrainer = async (data: RegisterTrainer): Promise<void> => {
    await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };
  
  // Функція для видалення тренера за id
  export const deleteTrainer = async (id: string): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  };