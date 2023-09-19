import { Route, Routes } from "react-router-dom";

// Pages
import Home from "../views/Home";
import DetailsRecipe from "../views/DetailsRecipe";
import EditRecipe from "../views/EditRecipe";
import AddRecipe from "../views/AddRecipe";
import NotFound from "../views/NotFound";
import About from "../views/About";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route path="/recipe/:id" Component={DetailsRecipe} />
      <Route path="/recipe/edit/:id" Component={EditRecipe} />
      <Route path="/recipe/add/" Component={AddRecipe} />
      <Route path="/about" Component={About} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default AppRoutes;
