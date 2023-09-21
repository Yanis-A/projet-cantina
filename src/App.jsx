import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import AppRoutes from "./router/Routes.jsx";
import Error from "./components/Error";
import useRecipes from "./hooks/useRecipes";
import { setRecipes, setTotalRecipes } from "./services/slices";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useRecipes();
  useEffect(() => {
    if (recipes) {
      dispatch(setRecipes(recipes));
      dispatch(setTotalRecipes(recipes.length));
    }
  }, [recipes, dispatch]);
  if (loading)
    return (
      <div style={{ minHeight: "100vh" }}>
        <Header />
        <div className="h-100 d-flex justify-content-center align-items-center text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  if (error)
    return (
      <div style={{ minHeight: "100vh" }}>
        <Header />
        <Error err={error.message} />
        <Footer />
      </div>
    );
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
