import RecipeCard from "../components/RecipeCard";
import { useSelector } from "react-redux";
import Search from "../components/Search";
import { useEffect } from "react";
import { setOpenedPopoverId } from "../services/slices";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.globalProps.recipes);
  // Gestion des champs de recherche
  const title = useSelector((state) => state.globalProps.searchFields.title);
  const portionsMin = useSelector(
    (state) => state.globalProps.searchFields.portions.min
  );
  const portionsMax = useSelector(
    (state) => state.globalProps.searchFields.portions.max
  );
  const level = useSelector((state) => state.globalProps.searchFields.level);
  const maxDuration = useSelector(
    (state) => state.globalProps.searchFields.maxDuration
  );

  useEffect(() => {
    dispatch(setOpenedPopoverId(null));
  }, [dispatch]);

  function filterRecipes(recipes) {
    let shouldKeep = true;
    if (title) {
      shouldKeep = recipes.titre.toLowerCase().includes(title.toLowerCase());
    }
    if (shouldKeep && portionsMin) {
      shouldKeep = recipes.personnes >= portionsMin;
    }
    if (shouldKeep && portionsMax) {
      shouldKeep = recipes.personnes <= portionsMax;
    }
    if (shouldKeep && level.length > 0) {
      shouldKeep = level.includes(recipes.niveau);
    }
    if (shouldKeep && maxDuration) {
      shouldKeep = recipes.tempsPreparation <= maxDuration;
    }
    return shouldKeep;
  }
  
  const filteredRecipes = recipes.filter(filterRecipes);
  
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center">
      <h1>Bienvenue!</h1>
      <p>
        Découvrez les recettes les plus savoureuses de Tatooine, à cuisiner chez
        vous.
      </p>
      <Search />
      <hr className="w-75 border border-dark opacity-50" />
      <h2 className="mt-2">Nos recettes</h2>
      <div className="row d-flex justify-content-center my-4 w-100">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
export default Home;
