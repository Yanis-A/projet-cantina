import PropTypes from "prop-types";
import { capitalizeFirstLetter, getComplexity } from "../services/utils";

function RecipeLevel({ level }) {
  function levelToNumber(level) {
    switch (level) {
      case "padawan":
        return 1;
      case "jedi":
        return 2;
      case "maitre":
        return 3;
    }
  }
  function getLevelStars(level) {
    let stars = [];
    for (let i = 0; i < level; i++) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
    }
    return stars;
  }
  return (
    <div
      data-bs-toggle="tooltip"
      data-bs-placement="left"
      data-bs-title={`Recette ${getComplexity(level)}`}
    >
      <div className="d-flex flex-row text-center text-warning justify-content-center align-items-center">
        {getLevelStars(levelToNumber(level)).map((star) => star)}
      </div>
      <span className="badge">{capitalizeFirstLetter(level)}</span>
    </div>
  );
}

RecipeLevel.propTypes = {
  level: PropTypes.string.isRequired,
};

export default RecipeLevel;
