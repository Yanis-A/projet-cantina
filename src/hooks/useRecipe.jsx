import { useEffect, useState } from "react";
import { fetchRecipe } from "../services/service";
import PropTypes from "prop-types";

function useRecipe(id) {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipe(id)
      .then((recipe) => {
        setRecipe(recipe);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return { recipe, loading, error };
}

useRecipe.propTypes = {
  id: PropTypes.number.isRequired,
};

export default useRecipe;
