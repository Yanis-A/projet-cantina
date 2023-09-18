import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

function AddRecipe() {
  const { id } = useParams();
  if (isNaN(id)) {
    return <NotFound />;
  }
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1>AddRecipe page!</h1>
      <h2>Recette n°{id}</h2>
    </div>
  );
}
export default AddRecipe;