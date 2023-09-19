import { useEffect, useState } from "react";
import { fetchRecipes } from "../services/service";

function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes()
      .then((recipes) => {
        setRecipes(recipes);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { recipes, loading, error };
}

export default useRecipes;
