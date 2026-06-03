import { API_BASE_URL } from './config';

/**
 * Universal HTTP request handler
 */
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'API Request failed');
  }
}

// ============================================================================
// RECIPES API
// ============================================================================

export async function getRecipes() {
  return apiRequest(`${API_BASE_URL}/recipes`);
}

export async function getRecipe(id) {
  return apiRequest(`${API_BASE_URL}/recipes/${id}`);
}

export async function createRecipe(data) {
  return apiRequest(`${API_BASE_URL}/recipes`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateRecipe(id, data) {
  return apiRequest(`${API_BASE_URL}/recipes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteRecipe(id) {
  return apiRequest(`${API_BASE_URL}/recipes/${id}`, {
    method: 'DELETE'
  });
}

// ============================================================================
// INGREDIENTS API
// ============================================================================

export async function getIngredients() {
  return apiRequest(`${API_BASE_URL}/ingredients`);
}

export async function getIngredient(id) {
  return apiRequest(`${API_BASE_URL}/ingredients/${id}`);
}

export async function createIngredient(data) {
  return apiRequest(`${API_BASE_URL}/ingredients`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateIngredient(id, data) {
  return apiRequest(`${API_BASE_URL}/ingredients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteIngredient(id) {
  return apiRequest(`${API_BASE_URL}/ingredients/${id}`, {
    method: 'DELETE'
  });
}
