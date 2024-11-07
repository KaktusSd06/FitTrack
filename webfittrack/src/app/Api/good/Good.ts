// Good.ts
import axios from 'axios';
import { Good } from '@/app/Interfaces/Interfaces';
const BASE_URL = '/api/proxy/Goods';


export const getGoods = async (): Promise<Good[]> => {
  try {
    const response = await axios.get<Good[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching goods", error);
    throw error;
  }
};

export const getGoodById = async (id: number): Promise<Good> => {
  try {
    const response = await axios.get<Good>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching good with ID ${id}`, error);
    throw error;
  }
};

export const createGood = async (good: Good): Promise<Good> => {
  try {
    const response = await axios.post<Good>(BASE_URL, good);
    return response.data;
  } catch (error) {
    console.error("Error creating good", error);
    throw error;
  }
};

export const updateGood = async (id: number, good: Good): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/${id}`, good);
  } catch (error) {
    console.error(`Error updating good with ID ${id}`, error);
    throw error;
  }
};

export const deleteGood = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting good with ID ${id}`, error);
    throw error;
  }
};
