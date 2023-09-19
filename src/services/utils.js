// Capitzalize string
export function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Convert to hours if minutes > 60
export function convertToHours(minutes) {
  if (minutes > 60) {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }
  return `${minutes}m`;
}

// Return an ajective for the complexity of the recipe
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

// Activates tooltips after a delay
export function activateTooltips() {
  setTimeout(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, 2000);
}