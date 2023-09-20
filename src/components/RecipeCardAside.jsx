import PropTypes from "prop-types";
//Elements
import RecipeLevel from "./RecipeLevel";
import RecipeQuantity from "./RecipeQuantity";
import RecipeDuration from "./RecipeDuration";
import RecipeCardButtons from "./RecipeCardButtons";
function RecipeCardAside({ recipe }) {
  return (
    <div
      className="position-absolute top-0 end-0 d-flex flex-column align-items-center justify-content-center pt-3 pe-2"
      style={{ zIndex: 999, minWidth: "75px" }}
    >
      <RecipeLevel level={recipe.niveau} tooltipPosition="left" />
      <RecipeQuantity quantity={recipe.personnes} tooltipPosition="left" />
      <RecipeDuration
        duration={recipe.tempsPreparation}
        tooltipPosition="left"
      />
      <div className="mt-2">
        <RecipeCardButtons
          id={recipe.id}
          title={recipe.titre}
          isOnPopover={true}
          isVertical={false}
          tooltipPosition="bottom"
        />
      </div>
    </div>
  );
}

RecipeCardAside.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCardAside;
