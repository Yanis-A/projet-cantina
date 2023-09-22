import PropTypes from "prop-types";
import { useState } from "react";
import { setBanner, setRecipes } from "../services/slices";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../services/service";
import { useNavigate } from "react-router-dom";

function RecipeForm({ recipe, onSave }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState("");
  const [personsError, setPersonsError] = useState("");
  const [formData, setFormData] = useState({
    id: recipe?.id || null,
    titre: recipe?.titre || "",
    description: recipe?.description || "",
    niveau: recipe?.niveau || "",
    personnes: recipe?.personnes || "",
    tempsPreparation: recipe?.tempsPreparation || "",
    ingredients: recipe?.ingredients || [],
    etapes: recipe?.etapes || [],
    photo: recipe?.photo || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Vérification de l'URL de l'image
    if (name === "photo") {
      const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i;

      if (!value.match(imageRegex)) {
        setImageError(
          "L'URL de l'image doit commencer par http:// ou https:// et se terminer par .jpg, .png, .jpeg, .gif ou .bmp"
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

  // Ajouter une paire d'ingrédients
  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ["", ""]],
    });
  };

  // Supprimer une paire d'ingrédients
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gestion du champ "personnes" (conversion en nombre)
    const personnesAsNumber = parseInt(formData.personnes, 10);

    if (!isNaN(personnesAsNumber)) {
      formData.personnes = personnesAsNumber;
      try {
        const result = await onSave(formData, recipe?.id);
        console.log("Réponse du serveur :", result);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
      }
    } else {
      console.error(
        "La valeur du champ 'personnes' n'est pas un nombre valide."
      );
      setPersonsError("La valeur du champ 'personnes' n'est pas un nombre valide.");
    }
    // Gestion du champ "durée de préparation" (conversion en nombre)
    const tempsPreparationAsNumber = parseInt(formData.tempsPreparation, 10);

    if (!isNaN(tempsPreparationAsNumber)) {
      formData.tempsPreparation = tempsPreparationAsNumber;
      try {
        const result = await onSave(formData, recipe?.id);
        console.log("Réponse du serveur :", result);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
      }
    } else {
      console.error(
        "La valeur du champ 'Temps de préparation' n'est pas un nombre valide."
      );
      setPersonsError("La valeur du champ 'Temps de préparation' n'est pas un nombre valide.");
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
    <form onSubmit={handleSubmit} className="needs-validation">
      <div className="mb-3">
        <label htmlFor="titre" className="form-label">
          Titre:
        </label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={formData.titre}
          onChange={handleInputChange}
          className="form-control"
          required
        />
        <div className="invalid-feedback">Ce champ est requis.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-control"
          required
        />
        <div className="invalid-feedback">Ce champ est requis.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="niveau" className="form-label">
          Niveau:
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
      <div className="mb-3">
        <label htmlFor="personnes" className="form-label">
          Nombre de personnes:
        </label>
        <input
          type="number"
          id="personnes"
          name="personnes"
          value={formData.personnes}
          onChange={handleInputChange}
          onKeyDown={preventNonNumericalInput}
          className="form-control"
          required
        />
        {personsError && <p className="text-danger">{personsError}</p>}
        <div className="invalid-feedback">Ce champ est requis.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="tempsPreparation" className="form-label">
          Temps de préparation (minutes):
        </label>
        <input
          type="number"
          id="tempsPreparation"
          name="tempsPreparation"
          value={formData.tempsPreparation}
          onChange={handleInputChange}
          onKeyDown={preventNonNumericalInput}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Ingrédients:</label>
        {formData.ingredients.map((ingredient, index) => (
          <div className="mb-3" key={index}>
            <div className="d-flex">
              <input
                type="text"
                value={ingredient[0]}
                onChange={(e) =>
                  handleIngredientChange(index, [e.target.value, ingredient[1]])
                }
                className="form-control mr-2"
                placeholder="Quantité"
              />
              <input
                type="text"
                value={ingredient[1]}
                onChange={(e) =>
                  handleIngredientChange(index, [ingredient[0], e.target.value])
                }
                className="form-control"
                placeholder="Ingrédient"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="mb-3">
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
      <div className="mb-3">
        <label className="form-label">Étapes:</label>
        {formData.etapes.map((etape, index) => (
          <div className="mb-3" key={index}>
            <div className="d-flex">
              <textarea
                value={etape}
                onChange={(e) => handleEtapeChange(index, e.target.value)}
                className="form-control mb-2"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleRemoveEtape(index)}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={handleAddEtape}
          >
            <i className="bi bi-plus-lg me-1"></i>
            Ajouter une étape
          </button>
        </div>
        <div className="invalid-feedback">Au moins une étape est requise.</div>
      </div>
      <div className="mb-3">
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
        />
        {imageError && <p className="text-danger">{imageError}</p>}
      </div>
      <button type="submit" className="btn btn-success">
        <i className="bi bi-check-lg me-1"></i>
        Enregistrer
      </button>
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
