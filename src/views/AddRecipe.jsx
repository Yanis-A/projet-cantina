import { useEffect } from "react";
import { useSelector } from "react-redux";
import RecipeForm from "../components/RecipeForm";
import { createRecipe } from "../services/service";

function AddRecipe() {
  const createdRecipeTitle = useSelector(
    (state) => state.globalProps.createdRecipeTitle
  );
  useEffect(() => {
    document.title = "Création de recette - Saveurs de Tatooine";
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-10 offset-1 d-flex flex-column align-items-center justify-content-center">
          {!createdRecipeTitle ? <h1>Création de recette</h1> : null}
          {createdRecipeTitle ? (
            <h1 className="text-center">
              Création de la recette
              <br />
              <strong className="fs-4">&quot;{createdRecipeTitle}&quot;</strong>
            </h1>
          ) : null}
          <RecipeForm onSave={createRecipe} />
        </div>
      </div>
    </div>
  );
}
export default AddRecipe;
