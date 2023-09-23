// Mettre une majuscule au début d'un mot
export function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Convertir en heures et minutes si minutes > 60
export function convertToHours(minutes) {
  if (minutes > 60) {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }
  return `${minutes}m`;
}

// Renvoie la difficulté en fonction du niveau
export function getComplexity(level) {
  switch (level) {
    case "padawan":
      return "simple";
    case "jedi":
      return "intermédiaire";
    case "maitre":
      return "difficile";
  }
}

// Vérifie si l'id est valide, et si le composant peut être affiché
export function isValidId(id, lastRecipe, recipes) {
  return (
    !isNaN(id) &&
    id >= 1 &&
    id <= lastRecipe &&
    id % 1 === 0 &&
    id !== null &&
    recipes.some((recipe) => recipe.id === id)
  );
}
