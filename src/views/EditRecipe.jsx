import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import useRecipe from "../hooks/useRecipe";
import { useDispatch, useSelector } from "react-redux";
import { setBanner } from "../services/slices";
import RecipeForm from "../components/RecipeForm";
import { editRecipe } from "../services/service";
import { isValidId } from "../services/utils";

function EditRecipe() {
  const id = parseInt(useParams().id, 10);
  const dispatch = useDispatch();
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [invalidId, setInvalidId] = useState(false);
  const recipes = useSelector((state) => state.globalProps.recipes);
  const lastRecipe = useSelector((state) => state.globalProps.lastRecipe);
  const { recipe, loading, error } = useRecipe(id);

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  useEffect(() => {
    if (recipe) {
      document.title = `Modifier la recette "${recipe.titre}" - Saveurs de Tatooine`;
    }
  }, [recipe]);

  useEffect(() => {
    if (isComponentMounted) {
      if (!isValidId(id, lastRecipe, recipes)) {
        setInvalidId(true);
      } else if (error) {
        dispatch(
          setBanner({
            type: "danger",
            message: error.message,
            uuid: crypto.randomUUID(),
          })
        );
      }
    }
  }, [id, recipes, lastRecipe, error, dispatch, isComponentMounted]);

  if (invalidId) {
    return <NotFound />;
  }

  return loading ? (
    <div className="h-100 d-flex justify-content-center align-items-center text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  ) : (
    !error && (
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1 d-flex flex-column align-items-center justify-content-center"></div>
          <h1 className="text-center">
            Modification de la recette
            <br />
            <strong>&quot;{recipe.titre}&quot;</strong>
          </h1>
          <RecipeForm recipe={recipe} onSave={editRecipe} />
        </div>
      </div>
    )
  );
}
export default EditRecipe;
