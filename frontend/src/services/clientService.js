const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const message = data?.message || `Erreur HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function getClients() {
  return request('/api/clients');
}

export function createClient(client) {
  return request('/api/clients', {
    method: 'POST',
    body: JSON.stringify(client),
  });
}

export function updateClient(id, data) {
  return request(`/api/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteClient(id) {
  return request(`/api/clients/${id}`, {
    method: 'DELETE',
  });
}

export { API_URL };
