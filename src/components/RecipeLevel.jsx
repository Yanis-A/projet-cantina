import PropTypes from "prop-types";
import { capitalizeFirstLetter, getComplexity } from "../services/utils";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function RecipeLevel({ level, tooltipPosition }) {
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
      stars.push(
        <i key={i} className="bi bi-star-fill" style={{ margin: "0 2px" }}></i>
      );
    }
    return stars;
  }
  return (
    <OverlayTrigger
      placement={tooltipPosition || "top"}
      overlay={
        <Tooltip id={`tooltip-${tooltipPosition || "top"}`}>
          Recette {getComplexity(level)}
        </Tooltip>
      }
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-row text-center text-warning justify-content-center align-items-center">
          {getLevelStars(levelToNumber(level)).map((star) => star)}
        </div>
        <span className="badge">{capitalizeFirstLetter(level)}</span>
      </div>
    </OverlayTrigger>
  );
}

RecipeLevel.propTypes = {
  level: PropTypes.string.isRequired,
  tooltipPosition: PropTypes.string,
};

export default RecipeLevel;
