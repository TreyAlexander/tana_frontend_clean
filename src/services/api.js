const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("access");

  return {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  };
}

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Login failed");
  }

  return result;
}

export async function registerUser(data) {
  const response = await fetch(`${API_URL}/api/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(result));
  }

  return result;
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/api/users/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get users");
  }

  return result;
}

export async function updateUser(pk, data) {
  const userData = {
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    email: data.email,
  };

  const response = await fetch(`${API_URL}/api/users/${pk}/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(result));
  }

  return result;
}

export async function getInventory() {
  const response = await fetch(`${API_URL}/api/inventory/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Failed to retrieve Inventory");
  }

  return result;
}

export async function updateInventory(pk, data) {
  const response = await fetch(`${API_URL}/api/inventory/${pk}/`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(result));
  }

  return result;
}

export async function deleteInventory(pk) {
  const response = await fetch(`${API_URL}/api/inventory/${pk}/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete inventory item");
  }

  return true;
}

export async function createInventory(data) {
  const response = await fetch(`${API_URL}/api/inventory/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(result));
  }

  return result;
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/api/categories/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Failed to retrieve categories");
  }

  return result;
}