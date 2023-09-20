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
