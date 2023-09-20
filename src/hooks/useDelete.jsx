import { useEffect, useState } from "react";
import { deleteRecipe } from "../services/service";

function useDelete({ id }) {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    deleteRecipe(id)
      .then((data) => {
        setLoading(false);
        setDeleted(data.message);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return { deleted, loading, error };
}

export default useDelete;
