import PropTypes from "prop-types";
import { useState } from "react";
import {
  setBanner,
  setRecipes,
  setCreatedRecipeTitle,
  setLastRecipe,
} from "../services/slices";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../services/service";
import { useNavigate } from "react-router-dom";
import default_image from "../assets/default_image.png";
import RequiredField from "./RequiredField";
function RecipeForm({ recipe, onSave }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState("");
  const [personsError, setPersonsError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [formData, setFormData] = useState({
    id: recipe?.id || null,
    titre: recipe?.titre || "",
    description: recipe?.description || "",
    niveau: recipe?.niveau || "",
    personnes: recipe?.personnes || "",
    tempsPreparation: recipe?.tempsPreparation || "",
    ingredients: recipe?.ingredients || [["", ""]],
    etapes: recipe?.etapes || [""],
    photo: recipe?.photo || "",
  });

  const initialTitle = recipe?.titre || "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "titre") {
      dispatch(setCreatedRecipeTitle(value));
    }
    // Vérification de l'URL de l'image
    if (name === "photo") {
      const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;

      if (!value.match(imageRegex) && value !== "") {
        setImageError(
          "L'URL de l'image doit commencer par http:// ou https:// et se terminer par .jpg, .png, .jpeg, .gif, .bmp ou .webp"
        );
      } else {
        setImageError("");
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleEtapeChange = (index, value) => {
    const updatedEtapes = [...formData.etapes];
    updatedEtapes[index] = value;
    setFormData({
      ...formData,
      etapes: updatedEtapes,
    });
  };

  // Ajouter un ingrédient
  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ["", ""]],
    });
  };

  // Supprimer un ingrédient
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  // Ajouter une étape
  const handleAddEtape = () => {
    setFormData({
      ...formData,
      etapes: [...formData.etapes, ""],
    });
  };

  // Supprimer une étape
  const handleRemoveEtape = (index) => {
    const updatedEtapes = [...formData.etapes];
    updatedEtapes.splice(index, 1);
    setFormData({
      ...formData,
      etapes: updatedEtapes,
    });
  };

  // Empêcher la saisie de caractères non numériques
  function preventNonNumericalInput(e) {
    if (!/^[0-9]*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  }

  const isButtonDisabled = () => {
    return !(
      formData.titre &&
      formData.description &&
      formData.niveau &&
      formData.personnes &&
      formData.tempsPreparation &&
      formData.ingredients.length > 0 &&
      formData.etapes.length > 0
    );
  };

  const disabled = isButtonDisabled();
  const buttonContent = disabled
    ? "Veuillez remplir tous les champs obligatoires"
    : recipe?.id
    ? `Modifier la recette "${initialTitle}"`
    : `Créer la recette "${formData.titre}"`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gestion du champ "personnes" (conversion en nombre)
    const personnesAsNumber = parseInt(formData.personnes, 10);

    if (!isNaN(personnesAsNumber)) {
      formData.personnes = personnesAsNumber;
    } else {
      setPersonsError(
        "La valeur du champ 'personnes' n'est pas un nombre valide."
      );
    }
    // Gestion du champ "durée de préparation" (conversion en nombre)
    const tempsPreparationAsNumber = parseInt(formData.tempsPreparation, 10);

    if (!isNaN(tempsPreparationAsNumber)) {
      formData.tempsPreparation = tempsPreparationAsNumber;
    } else {
      setDurationError(
        "La valeur du champ 'Temps de préparation' n'est pas un nombre valide."
      );
    }

    if (formData.photo === "") {
      formData.photo = default_image;
    }

    try {
      const result = await onSave(formData, recipe?.id);
      console.log("Réponse du serveur :", result);
      dispatch(
        setBanner({
          type: "success",
          message: result.message,
          uuid: crypto.randomUUID(),
        })
      );
      fetchRecipes()
        .then((recipes) => {
          dispatch(setRecipes(recipes));
          const lastId = recipes.reduce(
            (maxId, recipe) => Math.max(maxId, recipe.id),
            0
          );
          dispatch(setLastRecipe(lastId));
          dispatch(setCreatedRecipeTitle(""));
        })
        .catch((error) => {
          dispatch(
            setBanner({
              type: "danger",
              message: error.message,
              uuid: crypto.randomUUID(),
            })
          );
        });

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      dispatch(
        setBanner({
          type: "danger",
          message: error.message,
          uuid: crypto.randomUUID(),
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid needs-validation">
      <div className="row m-0">
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3">
          <label htmlFor="titre" className="form-label">
            Titre:
            <RequiredField />
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleInputChange}
            className="form-control"
            autoComplete="off"
            required
          />
          <div className="invalid-feedback">Ce champ est requis.</div>
        </div>
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3">
          <label htmlFor="description" className="form-label">
            Description:
            <RequiredField />
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            autoComplete="off"
            required
          />
          <div className="invalid-feedback">Ce champ est requis.</div>
        </div>
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4  mb-3">
          <label htmlFor="niveau" className="form-label">
            Niveau:
            <RequiredField />
          </label>
          <select
            id="niveau"
            name="niveau"
            value={formData.niveau}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Sélectionnez un niveau</option>
            <option value="padawan">Padawan</option>
            <option value="jedi">Jedi</option>
            <option value="maitre">Maître</option>
          </select>
          <div className="invalid-feedback">Ce champ est requis.</div>
        </div>
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3">
          <label htmlFor="personnes" className="form-label">
            Nombre de personnes:
            <RequiredField />
          </label>
          <input
            type="number"
            id="personnes"
            name="personnes"
            value={formData.personnes}
            min={1}
            onChange={handleInputChange}
            onKeyDown={preventNonNumericalInput}
            maxLength={2}
            className="form-control"
            required
          />
          {personsError && <p className="text-danger">{personsError}</p>}
          <div className="invalid-feedback">Ce champ est requis.</div>
        </div>
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3">
          <label htmlFor="tempsPreparation" className="form-label">
            Temps de préparation (minutes):
            <RequiredField />
          </label>
          <input
            type="number"
            id="tempsPreparation"
            name="tempsPreparation"
            value={formData.tempsPreparation}
            min={1}
            onChange={handleInputChange}
            onKeyDown={preventNonNumericalInput}
            maxLength={3}
            className="form-control"
            required
          />
          {durationError && <p className="text-danger">{durationError}</p>}
        </div>
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3">
          <label className="form-label">
            Ingrédients:
            <RequiredField />
          </label>
          {formData.ingredients.map((ingredient, index) => (
            <div className="mb-3" key={index}>
              <div className="row">
                <div className="col-3 pe-0">
                  <input
                    type="text"
                    value={ingredient[0]}
                    onChange={(e) =>
                      handleIngredientChange(index, [
                        e.target.value,
                        ingredient[1],
                      ])
                    }
                    className="form-control"
                    placeholder="Qté."
                    autoComplete="off"
                  />
                </div>
                <div className="col-7 pe-0">
                  <input
                    type="text"
                    value={ingredient[1]}
                    onChange={(e) =>
                      handleIngredientChange(index, [
                        ingredient[0],
                        e.target.value,
                      ])
                    }
                    className="form-control"
                    placeholder="Ingrédient"
                    autoComplete="off"
                    required
                  />
                </div>
                {index > 0 && (
                  <div className="col-1 px-0 m-auto">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={handleAddIngredient}
            >
              <i className="bi bi-plus-lg me-1"></i>
              Ajouter un ingrédient
            </button>
          </div>
          <div className="invalid-feedback">
            Au moins un ingrédient est requis.
          </div>
        </div>
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3">
          <label className="form-label">
            Étapes:
            <RequiredField />
          </label>
          {formData.etapes.map((etape, index) => (
            <div className="mb-3" key={index}>
              <div className="row">
                <div className="col-10 pe-0">
                  <textarea
                    value={etape}
                    onChange={(e) => handleEtapeChange(index, e.target.value)}
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </div>
                {index > 0 && (
                  <div className="col-1 px-0 m-auto">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveEtape(index)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={handleAddEtape}
            >
              <i className="bi bi-plus-lg me-1"></i>
              Ajouter une étape
            </button>
          </div>
          <div className="invalid-feedback">
            Au moins une étape est requise.
          </div>
        </div>
        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3">
          <label htmlFor="photo" className="form-label">
            URL de la photo:
          </label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
            className="form-control"
            autoComplete="off"
          />
          {imageError && <p className="text-danger">{imageError}</p>}
        </div>
        <div
          className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-3 d-grid"
          style={{ cursor: disabled ? "not-allowed" : "" }}
        >
          <button
            disabled={disabled}
            type="submit"
            className={"btn btn-" + (disabled ? "secondary" : "success")}
          >
            <i
              className={`bi bi-${
                disabled ? "exclamation-circle" : "check-lg"
              } me-1`}
            ></i>
            {buttonContent}
          </button>
        </div>
      </div>
    </form>
  );
}

RecipeForm.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    titre: PropTypes.string,
    description: PropTypes.string,
    niveau: PropTypes.string,
    personnes: PropTypes.number,
    tempsPreparation: PropTypes.number,
    ingredients: PropTypes.array,
    etapes: PropTypes.array,
    photo: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default RecipeForm;
