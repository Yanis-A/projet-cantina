import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import AppRoutes from "./router/Routes.jsx";
import Banner from "./components/Banner";
import useRecipes from "./hooks/useRecipes";
import { setRecipes, setLastRecipe, setBanner } from "./services/slices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useRecipes();
  const bannerType = useSelector((state) => state.globalProps.banner.type);
  const bannerMessage = useSelector((state) => state.globalProps.banner.message);
  const bannerUuid = useSelector((state) => state.globalProps.banner.uuid);

  useEffect(() => {
    if (recipes) {
      dispatch(setRecipes(recipes));
      const lastId = recipes.reduce((maxId, recipe) => Math.max(maxId, recipe.id), 0);
      dispatch(setLastRecipe(lastId));
    }
  }, [recipes, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setBanner({ type: "danger", message: error.message, uuid: crypto.randomUUID() }));
    }
  }, [error, dispatch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Banner type={bannerType} message={bannerMessage} uuid={bannerUuid} />
      <Header />
      {loading ? (
        <div className="h-100 d-flex justify-content-center align-items-center text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : (
        !error && <AppRoutes />
      )}
      <Footer />
    </div>
  );
}

export default App;
