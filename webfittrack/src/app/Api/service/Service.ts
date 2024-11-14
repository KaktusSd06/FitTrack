const BASE_URL = '/api/proxy/Services'; // Замініть на ваш базовий URL
import {Service} from "@/app/Interfaces/Interfaces";
 
// Функція для отримання всіх послуг
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Функція для створення нової послуги
export const createService = async (service: Service): Promise<Service> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error('Failed to create service');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Функція для отримання послуги за ID
export const getServiceById = async (id: number): Promise<Service | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch service by ID');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Функція для оновлення послуги
export const updateService = async (id: number, service: Service): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error('Failed to update service');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Функція для видалення послуги
export const deleteService = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete service');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
