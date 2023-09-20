import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Error from "../components/Error";
import useRecipe from "../hooks/useRecipe";
import { useSelector } from "react-redux";
// Elements
import RecipeLevel from "../components/RecipeLevel";
import RecipeQuantity from "../components/RecipeQuantity";
import RecipeDuration from "../components/RecipeDuration";
import RecipeCardButtons from "../components/RecipeCardButtons";

function DetailsRecipe() {
  const { id } = useParams();
  const idAsNumber = Number(id);

  const totalRecipes = useSelector((state) => state.globalProps.totalRecipes);
  const { recipe, loading, error } = useRecipe(idAsNumber);

  if (
    isNaN(idAsNumber) ||
    idAsNumber < 1 ||
    idAsNumber > totalRecipes ||
    idAsNumber % 1 !== 0 ||
    !idAsNumber
  ) {
    return <NotFound />;
  }

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
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center position-relative"
    >
      <div className="position-absolute" style={{width: '100%', height: '100%', backgroundImage: `url(${recipe.photo})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        opacity: "0.1",
        filter: "blur(5px)"}} />
      <div className="row">
        <div className="col-10 col-md-4 offset-1 offset-md-0 d-flex align-items-start justify-content-center">
          <img
            src={recipe.photo}
            alt={recipe.titre}
            style={{ width: "100%", maxWidth: "300px" }}
            className="img-fluid rounded shadow-sm mt-2"
          />
        </div>
        <div className="col-10 col-md-8 offset-1 offset-md-0 position-relative mt-3 mt-sm-0">
          <div className="position-absolute top-0 end-0 py-1 px-2">
            <RecipeCardButtons
              id={recipe.id}
              title={recipe.titre}
              tooltipPosition="left"
              isVertical={true}
              isOnPopover={false}
            />
          </div>
          <h1>{recipe.titre}</h1>
          <p>{recipe.description}</p>
          <div className="d-flex flex-row align-items-center justify-content-start">
            <div className="me-3">
              <RecipeLevel level={recipe.niveau} tooltipPosition="top" />
            </div>
            <div className="me-3">
              <RecipeQuantity
                quantity={recipe.personnes}
                tooltipPosition="top"
              />
            </div>
            <div>
              <RecipeDuration
                duration={recipe.tempsPreparation}
                tooltipPosition="top"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>Ingrédients</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="fw-bold">{ingredient[0]}</span>
                    &nbsp;
                    <span>{ingredient[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-10">
              <h3>Étapes</h3>
              <ol>
                {recipe.etapes.map((etape, index) => (
                  <li key={index}>{etape}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsRecipe;
