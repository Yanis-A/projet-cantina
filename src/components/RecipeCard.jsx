import PropTypes from "prop-types";
import styles from "../styles/RecipeCard.module.css";
import RecipeCardAside from "./RecipeCardAside";
import { useNavigate } from "react-router-dom";
function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  return (
    <div className="col-10 col-md-6 col-lg-3 d-flex align-items-center justify-content-center">
      <div
        className={
          "card text-bg-dark text-start my-1 position-relative " +
          styles.card_custom
        }
      >
        <img src={recipe.photo || "https://via.placeholder.com/600x800?text=???"} className="card-img" alt="..." />
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
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            type="button"
            className="btn btn-light"
          >
            Voir la recette
          </button>
        </div>
      </div>
      {/* Modal */}
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-dark fs-5" id="exampleModalLabel">
                Suppression
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-dark">Veuillez confirmer la suppression de la recette &quot;{recipe.titre}&quot;</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button type="button" className="btn btn-danger">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCard;
