import React, { useState } from "react";
import RecipeList from "./components/RecipeList";
import "./App.css";


function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!ingredient) return;
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
        setError("");
      } else {
        setRecipes([]);
        setError("No recipes found for this ingredient.");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Try again later.");
      setRecipes([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="App">
      <h1>🍽️ Your Recipe, Your Way</h1>
      <p className="subtitle">Search meals by ingredients in seconds</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ingredient (e.g., chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;