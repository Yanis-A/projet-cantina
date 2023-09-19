import useRecipes from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";
import Error from "../components/Error";
// import Search from "../components/Search";

function Home() {
  const { recipes, loading, error } = useRecipes();

  if (loading)
    return (
      <div className="h-100 d-flex justify-content-center align-items-center text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) return <Error err={error.message} />;

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center">
      <h1>Bienvenue!</h1>
      <p>
        Découvrez les recettes les plus savoureuses de Tatooine, à cuisiner chez
        vous.
      </p>
      {/* <Search /> */}
      {/* <hr className="w-75 border border-dark opacity-50" /> */}
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
