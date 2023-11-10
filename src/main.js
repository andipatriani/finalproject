function buttonClicked() {
    var query = document.getElementById("meal").value; // Get the selected value from the dropdown
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        var meal = data.meals[0];
        var ingredients = getIngredientsList(meal);
        document.getElementById("display").innerHTML = 
        ` <div class="recipe-container2">
            <div class="recipe2">
              Meal : ${meal.strMeal} <br> 
              <img src=${meal.strMealThumb} 
              <br><br> Original country : ${meal.strArea} 
              <br> Instructions : <ul>${meal.strInstructions}</ul>
              <br> Ingredients : <ul> ${ingredients} 
              <br> Link : <a href="${meal.strYoutube}" target="_blank">${meal.strYoutube}</a>
              <br> Wanna know how to prepare this delicious food? Click here : <a href="${meal.strSource}" target="_blank">${meal.strSource}</a> 
              </div
          </div>
        `
        
        function getIngredientsList(meal) {
          var ingredients = [];
          for (let i = 1; i <= 20; i++) {
            // Ingredients are listed from strIngredient1 to strIngredient20
            var ingredient = meal[`strIngredient${i}`];
            var measure = meal[`strMeasure${i}`];

            // Check if ingredient is not null or empty
            if (ingredient) {
              // If a measure is available, include it
              if (measure) {
                ingredients.push(`<li>${measure} ${ingredient}</li>`);
              } else {
                ingredients.push(`<li>${ingredient}</li>`);
              }
            }
          }
          return ingredients.join('');
        }
      })
      
      
  }
  

