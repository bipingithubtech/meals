const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const fetchData = async (query) => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    displayResults(data.meals || []);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayResults = (meals) => {
  meals.forEach((element) => {
    resultsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.className = "meal-item";
    div.innerHTML = ` <h2>${element.strMeal}</h2>
              <img src="${element.strMealThumb}" alt="" srcset="" />
              <button onclick="addToFavorites('${element.idMeal}')">Add to Favorites</button>
              <button onclick="window.location.href='meal.html?id=${element.idMeal}'">View Details</button>`;
    resultsContainer.appendChild(div);
  });
};

searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  fetchData(query);
});

const addToFavorites = (mealId) => {
  let fav = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!fav.includes(mealId)) {
    fav.push(mealId);
    localStorage.setItem("favorites", JSON.stringify(fav));
  }
};
