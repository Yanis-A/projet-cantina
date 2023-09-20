import axios from "axios";

const BASE_URL = "http://localhost:9000/api";

// Récupérer toutes les recettes
export async function fetchRecipes() {
  const response = await axios.get(`${BASE_URL}/recipes`);
  return response.data;
}
// Récupérer une recette par son id
export async function fetchRecipe(id) {
  const response = await axios.get(`${BASE_URL}/recipe/${id}`);
  return response.data;
}
// Créer une recette
export async function createRecipe(recipe) {
  const response = await axios.post(`${BASE_URL}/recipe`, recipe);
  return response.data;
}
// Modifier une recette
export async function editRecipe(recipe, id) {
  const response = await axios.put(`${BASE_URL}/recipe/${id}`, recipe);
  return response.data;
}
// Supprimer une recette
export async function deleteRecipe(id) {
  const response = await axios.delete(`${BASE_URL}/recipe/${id}`);
  return response.data;
}
