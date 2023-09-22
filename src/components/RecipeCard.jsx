import PropTypes from "prop-types";
import styles from "../styles/RecipeCard.module.css";
import RecipeCardAside from "./RecipeCardAside";
import { useNavigate } from "react-router-dom";
function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const cardStyle = {
    backgroundImage: `url(${recipe.photo || "https://via.placeholder.com/600x800?text=???"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "420px",
    width: "100%",
    overflow: "hidden",
  };
  return (
    <div className="col-10 col-sm-6 col-lg-3 d-flex align-items-center justify-content-center">
      <div
        className={
          "card text-bg-dark text-start border border-light my-2 position-relative " +
          styles.card_custom
        }
        style={cardStyle}
      >
        <div className="card-img-overlay w-75" style={{ zIndex: 999 }}>
          <h5 className="card-title fw-bold">{recipe.titre}</h5>
          <p className="card-text">{recipe.description}</p>
        </div>
        <RecipeCardAside recipe={recipe} />
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-grid gap-2 w-75"
          style={{ zIndex: 999 }}
        >
          <button
            onClick={() => navigate(`/recipe/${+recipe.id}`)}
            type="button"
            className="btn btn-light"
          >
            Voir la recette
          </button>
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCard;
