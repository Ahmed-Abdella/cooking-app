import "./Recipe.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
export default function Recipe() {
  const { id } = useParams();
  console.log(id);
  // const url = "http://localhost:3000/recipes/" + id;
  const url =
    "https://abdella-recipes-default-rtdb.europe-west1.firebasedatabase.app/recipes/" +
    id +
    ".json";
  const { dataOne: recipe, error, isPending } = useFetch(url);
  const navigate = useNavigate();
  const { mode } = useTheme();

  useEffect(() => {
    if (error) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [error]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">laoding...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
