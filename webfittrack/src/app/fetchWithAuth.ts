export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response | undefined> => {
  let token = sessionStorage.getItem("accessToken");

  // Якщо немає accessToken, намагаємось отримати новий за допомогою refreshToken
  if (!token) {
    await refreshToken();
    token = sessionStorage.getItem("accessToken"); // Перевіряємо ще раз після оновлення
  }

  // Якщо accessToken все ще немає, редиректимо на логін
  if (!token) {
    window.location.href = "/pages/Login"; // Редирект на логін
    return;
  }

  const headers = new Headers(options.headers);
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(url, { ...options, headers });

  // Якщо запит повертає 401 (неавторизовано), намагаємось оновити токен
  if (response.status === 401) {
    await refreshToken();
    const newToken = sessionStorage.getItem("accessToken");
    if (newToken) {
      headers.set("Authorization", `Bearer ${newToken}`);
      return fetch(url, { ...options, headers });
    } else {
      // Якщо refreshToken теж недійсний, редиректимо на сторінку логіну
      window.location.href = "/pages/Login"; // Редирект на логін
    }
  }

  return response;
};

const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const userId = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;

  if (!refreshToken || !userId) {
    window.location.href = "/pages/Login"; // Якщо немає refreshToken або userId, редиректимо на логін
    return;
  }

  const response = await fetch("/api/proxy/Account/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken, userId }),
  });

  // Якщо refreshToken теж недійсний (наприклад, повернувся 401), перекидуємо на логін
  if (response.status === 401) {
    sessionStorage.clear();
    localStorage.removeItem("currentUser");
    window.location.href = "/pages/Login"; // Редиректимо на сторінку логіну
    return;
  }

  const data = await response.json();
  sessionStorage.setItem("accessToken", data.accessToken);
  sessionStorage.setItem("refreshToken", data.refreshToken);
};
