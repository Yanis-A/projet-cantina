import PropTypes from "prop-types";
import RecipeLevel from "./RecipeLevel";
import RecipeCardButtons from "./RecipeCardButtons";
// import bootstrap from "bootstrap";
import { convertToHours } from "../services/utils.js";

function RecipeCardAside({ recipe }) {
  return (
    <div
      className="position-absolute top-0 end-0 d-flex flex-column align-items-center justify-content-center pt-3 pe-2"
      style={{ zIndex: 999, minWidth: "75px" }}
    >
      <RecipeLevel level={recipe.niveau}/>
      <div
        className="mt-1"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        data-bs-title={`Pour ${recipe.personnes} personnes`}
      >
        {recipe.personnes}&nbsp;
        <i className="bi bi-person-fill"></i>
      </div>
      <div
        className="mt-1"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        data-bs-title={`Temps de préparation: ${convertToHours(
          recipe.tempsPreparation
        )}`}
      >
        <i className="bi bi-clock-fill"></i>&nbsp;
        {convertToHours(recipe.tempsPreparation)}
      </div>
      <RecipeCardButtons
        id={recipe.id}
        title={recipe.titre}
      />
    </div>
  );
}

RecipeCardAside.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCardAside;
