import { Route, Routes } from "react-router-dom";

// Pages
import Home from "../views/Home";
import DetailsRecipe from "../views/DetailsRecipe";
import EditRecipe from "../views/EditRecipe";
import AddRecipe from "../views/AddRecipe";
import NotFound from "../views/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route path="/recette/:id" Component={DetailsRecipe} />
      <Route path="/recette/edit/:id" Component={EditRecipe} />
      <Route path="/recette/add/" Component={AddRecipe} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default AppRoutes;
