const Container = document.getElementById("mealDetail");

const fetchDetail = async (mealId) => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await res.json();
    displayMealDetail(data.meals[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayMealDetail = (data) => {
  Container.innerHTML = `<h1>${data.strMeal}</h1>
    <img src="${data.strMealThumb}" alt="${data.strMeal}" width="200">
    <p>${data.strInstructions}</p>`;
};

const url = new URLSearchParams(window.location.search);

const id = url.get("id");
fetchDetail(id);
