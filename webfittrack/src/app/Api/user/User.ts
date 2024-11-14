const apiUrl = '/api/proxy/Users';

// Отримання користувача за роллю
export const getUserByRole = async (personRole: string) => {
    
  console.log(`${apiUrl}/${personRole}`);
  const response = await fetch(`${apiUrl}/${personRole}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

// Отримання користувача за ID
export const getUserById = async (id: string) => {
  const response = await fetch(`${apiUrl}/get-by-id/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user by ID');
  }
  return response.json();
};

// Отримання користувача за email
export const getUserByEmail = async (email: string) => {
  const response = await fetch(`${apiUrl}/get-by-email/${email}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user by email');
  }
  return response.json();
};

// Оновлення основної інформації користувача
export const updateUserBasicInfo = async (id: string, data: unknown) => {
  const response = await fetch(`${apiUrl}/update-basic-info/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update user info');
  }
  return response.json();
};

// Створення користувача
export const createUser = async (data: unknown) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};

// Видалення користувача за ID
export const deleteUser = async (id: string) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
};
