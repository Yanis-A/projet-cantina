import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import useRecipe from "../hooks/useRecipe";
import { useDispatch, useSelector } from "react-redux";
import { setBanner } from "../services/slices";
import RecipeForm from "../components/RecipeForm";
import { editRecipe } from "../services/service";

function EditRecipe() {
  const id = parseInt(useParams().id, 10);
  const dispatch = useDispatch();
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [invalidId, setInvalidId] = useState(false);
  const lastRecipe = useSelector((state) => state.globalProps.lastRecipe);
  const { recipe, loading, error } = useRecipe(id);

  // useEffect(() => {
  //   if (recipe) {
  //     document.title = `Modifier la recette "${recipe.titre}" - Recettes de cuisine`;
  //   }
  // }
  // , [recipe]);

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  useEffect(() => {
    if (isComponentMounted) {
      if (isNaN(id) || id < 1 || id > lastRecipe || id % 1 !== 0 || !id) {
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
  }, [id, lastRecipe, error, dispatch, isComponentMounted]);

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
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <h1>Modification de la recette <strong>&quot;{recipe.titre}&quot;</strong></h1>
        <RecipeForm recipe={recipe} onSave={editRecipe} />
      </div>
    )
  );
}
export default EditRecipe;