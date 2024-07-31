const favoritesContainer = document.getElementById("favorites");

const fetchMealDetails = async (mealId) => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Favorites = async () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorite meals yet.</p>";
    return;
  }
  favoritesContainer.innerHTML = ""; // Clear previous results
  for (const mealId of favorites) {
    const meal = await fetchMealDetails(mealId);
    const div = document.createElement("div");
    div.className = "meal-item";
    div.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="100">
            <button onclick="removeFromFavorites('${meal.idMeal}')">Remove from Favorites</button>
        `;
    favoritesContainer.appendChild(div);
  }
};
const removeFromFavorites = (mealId) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  fav = favorites.filter((id) => id !== mealId);
  localStorage.setItem("favorites", JSON.stringify(fav));
  Favorites(); // Refresh the list
};

Favorites();
