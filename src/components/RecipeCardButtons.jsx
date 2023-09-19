import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function RecipeCardButtons({ id }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <button
        className="btn btn-light btn-sm"
        onClick={() => navigate(`/recipe/edit/${id}`)}
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        data-bs-title="Modifier la recette"
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      {/* <span
        className="mt-1"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        data-bs-title="Supprimer la recette"
        >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-danger btn-sm"
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </span> */}
    </div>
  );
}

RecipeCardButtons.propTypes = {
  id: PropTypes.number.isRequired,
};

export default RecipeCardButtons;
