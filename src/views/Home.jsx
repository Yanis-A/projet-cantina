import RecipeCard from "../components/RecipeCard";
import { useSelector } from "react-redux";
import Search from "../components/Search";
import { useEffect } from "react";
import { setOpenedPopoverId } from "../services/slices";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.globalProps.recipes);
  useEffect(() => {
    dispatch(setOpenedPopoverId(null));
  }, [dispatch]);
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
      <div className="row d-flex justify-content-center my-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
export default Home;
