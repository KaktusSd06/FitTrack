export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response | undefined> => {
  let token = sessionStorage.getItem("accessToken");

  if (!token || token == "undefined" || token === null) {
    await refreshToken();
    token = sessionStorage.getItem("accessToken");
  }

  if (!token || token == "undefined" || token === null) {
    window.location.href = "/pages/Login";
    return;
  }

  const headers = new Headers(options.headers);
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(url, { ...options, headers });
  console.log(response.status);
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

  if (!refreshToken || refreshToken == "undefined" || !userId) {
    window.location.href = "/pages/Login"; // Якщо немає refreshToken або userId, редиректимо на логін
    return;
  }

  const tokenData = {
    refreshToken: refreshToken,
    userId: userId,
  };
  const response = await fetch("/api/proxy/Account/refresh-tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenData),
  });

  console.log(response.json);
  console.log(response.status);
  console.log(tokenData);

  // Якщо refreshToken теж недійсний (наприклад, повернувся 401), перекидуємо на логін
  if (response.status === 401) {
    sessionStorage.clear();
    localStorage.removeItem("currentUser");
    window.location.href = "/pages/Login"; // Редиректимо на сторінку логіну
    return;
  }

  const data = await response.json();
  console.log(data.accessToken, data.refreshToken);
  sessionStorage.setItem("accessToken", data.accessToken);
  sessionStorage.setItem("refreshToken", data.refreshToken);
};
