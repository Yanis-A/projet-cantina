import RecipeCard from "../components/RecipeCard";
import { useSelector } from "react-redux";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import { setOpenedPopoverId, resetSearchFields } from "../services/slices";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";

function Home() {
  const dispatch = useDispatch();
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

  const allRecipes = useSelector((state) => state.globalProps.recipes);

  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);

  const resetSearchFieldsHandler = () => {
    dispatch(resetSearchFields());
  };

  useEffect(() => {
    document.title = "Bienvenue sur Saveurs de Tatooine !";
  }, []);

  useEffect(() => {
    const updatedRecipes = allRecipes.filter((recipe) => {
      let shouldKeep = true;

      if (title) {
        shouldKeep = recipe.titre.toLowerCase().includes(title.toLowerCase());
      }
      if (shouldKeep && portionsMin) {
        shouldKeep = recipe.personnes >= portionsMin;
      }
      if (shouldKeep && portionsMax) {
        shouldKeep = recipe.personnes <= portionsMax;
      }
      if (shouldKeep && level.length > 0) {
        shouldKeep = level.includes(recipe.niveau);
      }
      if (shouldKeep && maxDuration) {
        shouldKeep = recipe.tempsPreparation <= maxDuration;
      }

      return shouldKeep;
    });

    setFilteredRecipes(updatedRecipes);
  }, [title, portionsMin, portionsMax, level, maxDuration, allRecipes]);

  useEffect(() => {
    dispatch(setOpenedPopoverId(null));
  }, [dispatch]);

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "60vh" }}
    >
      {allRecipes.length !== 0 && (
        <>
          <div className="position-fixed sticky-top top-0 end-0 me-4 mt-3 d-none d-md-block">
            <Link to="/recipe/add" className="btn btn-warning">
              <i className="bi bi-plus-lg me-1"></i>
              Créer une recette
            </Link>
          </div>
          <div className="position-fixed sticky-top top-0 end-0 me-2 mt-3 d-block d-md-none">
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="tooltip-left">Créer une recette</Tooltip>}
            >
              <Link to="/recipe/add" className="btn btn-warning">
                <i className="bi bi-plus-lg"></i>
              </Link>
            </OverlayTrigger>
          </div>
        </>
      )}
      <h1>Bienvenue!</h1>
      <p>
        Découvrez les recettes les plus savoureuses de Tatooine, à cuisiner chez
        vous.
      </p>
      {allRecipes.length !== 0 && <Search />}
      <hr className="w-75 border border-secondary" />
      <h2 className="mt-2">Nos recettes</h2>
      <div className="row d-flex justify-content-center my-4 w-100">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {allRecipes.length !== 0 && filteredRecipes.length === 0 && (
          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <h3 className="text-center mb-4">
              Aucune recette ne correspond à votre recherche.
            </h3>
            <p className="mb-4">
              Veuillez modifier les paramètres du formulaire ou cliquer sur le
              bouton ci-dessous pour les réinitialiser.
            </p>
            <button
              type="button"
              className="btn btn-danger mb-4"
              onClick={resetSearchFieldsHandler}
            >
              Réinitialiser les paramètres
            </button>
          </div>
        )}
        {allRecipes.length === 0 && (
          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <h3 className="text-center mb-4">
              Aucune recette à afficher pour l&apos;instant.
            </h3>
            <p className="mb-4">Pourquoi ne pas en créer une, padawan?</p>
            <Link to="/recipe/add" className="btn btn-light">
              Créer une recette
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
