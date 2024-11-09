import { Admin } from "@/app/Interfaces/Interfaces";
import axios from "axios";

const BASE_URL = "/api/proxy/Admins";

export const getAdminByRole = async (personRole: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${personRole}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin by role:", error);
    throw error;
  }
};

export const getAdminById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    throw error;
  }
};

export const getAdminByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-by-email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin by email:", error);
    throw error;
  }
};

export const updateAdminBasicInfo = async (id: string, updateData: Admin) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-basic-info/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating admin basic info:", error);
    throw error;
  }
};

export const registerAdmin = async (registerData: Admin) => {
  try {
    const response = await axios.post(BASE_URL, registerData);
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error;
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};
