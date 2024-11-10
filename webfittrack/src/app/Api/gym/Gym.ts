// Gym.ts
import { Gym } from "@/app/Interfaces/Interfaces";

const BASE_URL = "/api/proxy/Gyms";

// Fetch all gyms
export async function fetchGyms(): Promise<Gym[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Error fetching gyms: ${response.statusText}`);
  }
  return await response.json();
}

// Create a new gym
export async function createGym(newGym: Gym): Promise<Gym> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGym),
  });

  if (!response.ok) {
    throw new Error(`Error creating gym: ${response.statusText}`);
  }
  return await response.json();
}

// Fetch a gym by ID
export async function fetchGymById(id: number): Promise<Gym> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching gym with ID ${id}: ${response.statusText}`);
  }
  return await response.json();
}

// Update a gym by ID
export async function updateGym(id: number, updatedGym: Gym): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedGym),
  });

  if (!response.ok) {
    throw new Error(`Error updating gym with ID ${id}: ${response.statusText}`);
  }
}

// Delete a gym by ID
export async function deleteGym(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error deleting gym with ID ${id}: ${response.statusText}`);
  }
}

// Fetch gyms by owner ID
export async function fetchGymsByOwnerId(ownerId: string): Promise<Gym[]> {
  const response = await fetch(`${BASE_URL}/get-by-ownerId/${ownerId}`);
  if (!response.ok) {
    throw new Error(`Error fetching gyms by owner ID ${ownerId}: ${response.statusText}`);
  }
  return await response.json();
}
