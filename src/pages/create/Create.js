import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import "./Create.css";
export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [submited, setSubmited] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const { postData, data, error } = useFetch(
    "https://abdella-recipes-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
    "POST"
  );

  const { mode, color } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + "minutes",
    });
    setTitle("");
    setMethod("");
    setCookingTime("");
    setSubmited(true);
    setTimeout(() => {
      setSubmited(false);
    }, 2000);
    setIngredients([]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }

    setNewIngredient("");
    ingredientInput.current.focus();
  };

  //redirect after create

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  });

  return (
    <div className={`create ${mode}`}>
      {submited && <h5>your recipe has bee created</h5>}
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} style={{ background: color }}>
              add
            </button>
          </div>
        </label>
        <p>
          current ingredients:
          {ingredients.map((i) => (
            <em key={i}>{i},</em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (in minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn" style={{ background: color }}>
          submit
        </button>
      </form>
    </div>
  );
}
