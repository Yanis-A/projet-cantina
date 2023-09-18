import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

function EditRecipe() {
  const { id } = useParams();
  if (isNaN(id)) {
    return <NotFound />;
  }
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1>EditRecipe page!</h1>
      <h2>Edition de la recette n°{id}</h2>
    </div>
  );
}
export default EditRecipe;