import { useEffect, useState } from "react";
import { fetchRecipes } from "../services/service";
import { useDispatch } from "react-redux";

function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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
  }, [dispatch]);

  return { recipes, loading, error };
}

export default useRecipes;
