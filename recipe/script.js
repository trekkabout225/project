// Get DOM elements
const form = document.querySelector('form');
const recipeList = document.querySelector('#recipe-list');
const noRecipes = document.getElementById('no-recipes');
const searchBox = document.getElementById('search-box');
const currentList = document.querySelector('#target');

// Define recipes array

// let recipes = []
let recipes = [
        {
          "name": "Baked Rigatoni",
          "image_url": ["/img/baked-rigitoni.jpg"],
          "ingredients": ["<li>1 tablespoon butter</li>",
                          "<li>2 tablespoons olive oil</li>",
                          "<li>1 onion (chopped)</li>",
                          "<li>1 (26-ounce) jar tomato pasta sauce (or homemade )</li>",
                          "<li>3 tablespoons water</li>"],
          "method": ""
        },
        {
          "name": "Bolognese",
          "image_url": ["/img/bolognese.jpg"],
          "ingredients": ["<li>1 tablespoon butter</li>",
                          "<li>2 tablespoons olive oil</li>",
                          "<li>1 onion (chopped)</li>",
                          "<li>1 (26-ounce) jar tomato pasta sauce (or homemade )</li>",
                          "<li>3 tablespoons water</li>"],
          "method": ""
        },
        {
          "name": "Fettuccine Alfredo",
          "image_url": ["/img/fettuccine-alfredo.jpg"],
          "ingredients": ["<li>226 grams fettuccine (- ½ pound)</li>",
                          "<li>6 cups water</li>",
                          "<li>1 to 1.5 teaspoons salt (or add as required)</li>",
                          "<li>3 to 4 tablespoons Butter (- 30 grams, unsalted or salted)</li>",
                          "<li>½ teaspoon garlic (- finely chopped)</li>"],
          "method": ""
        }
];

// let data = {
//   "response": {
//       "docs": [
//           {
//               "content_type": "article",
//               "description": ["<li>1 tablespoon butter</li>",
//                               "<li>2 tablespoons olive oil</li>",
//                               "<li>1 onion (chopped)</li>",
//                               "<li>1 (26-ounce) jar tomato pasta sauce (or homemade )</li>",
//                               "<li>3 tablespoons water</li>"],
//               "image_url": ["/img/baked-rigitoni.jpg"],
//               "title": "baked-rigitoni"
//           },
//           {
//               "content_type": "article",
//               "description": ["<li>1 tablespoon butter</li>",
//                               "<li>2 tablespoons olive oil</li>",
//                               "<li>1 onion (chopped)</li>",
//                               "<li>1 (26-ounce) jar tomato pasta sauce (or homemade )</li>",
//                               "<li>3 tablespoons water</li>"],
//               "image_url": ["/img/bolognese.jpg"],
//               "title": "bolognese"
//           },
//           {
//               "content_type": "article",
//               "description": ["<li>226 grams fettuccine (- ½ pound)</li>",
//                               "<li>6 cups water</li>",
//                               "<li>1 to 1.5 teaspoons salt (or add as required)</li>",
//                               "<li>3 to 4 tablespoons Butter (- 30 grams, unsalted or salted)</li>",
//                               "<li>½ teaspoon garlic (- finely chopped)</li>"],
//               "image_url": ["/img/fettuccine-alfredo.jpg"],
//               "title": "fettuccine-alfredo"
//           }
//       ]
//   }
// };


// Handle form submit
function handleSubmit(event) {
  // Prevent default form submission behavior
  event.preventDefault();
  
  // Get recipe name, ingredients, and method input values
  const nameInput = document.querySelector('#recipe-name');
  const imageInput = document.querySelector('#image-name');
  const ingrInput = document.querySelector('#recipe-ingredients');
  const methodInput = document.querySelector('#recipe-method');
  const name = nameInput.value.trim();
  const ingredients = ingrInput.value.trim().split(',').map(i => i.trim());
  const method = methodInput.value.trim();
  
  // Check if recipe name, ingredients, and method are valid
  if (name && ingredients.length > 0 && imageInput && method) {
    // Create new recipe object and add it to recipes array
    const newRecipe = { name, ingredients, method };
    recipes.push(newRecipe);
    
    // Clear form inputs
    nameInput.value = '';
    imageInput.value = '';
    ingrInput.value = '';
    methodInput.value = '';
    
    // Add new recipe to recipe list
    displayRecipes();
  }
}

// Display recipes in recipe list
function displayRecipes() {
  recipeList.innerHTML = '';
  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
	// Create div to display the individual recipe, for each recipe
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><img src ="${recipe.image_url}" class="image-styles" /></p>
      <br/>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
      </ul>
      <br/>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <br/>
      <button class="delete-button" data-index="${index}">Delete</button>`;
    recipeDiv.classList.add('recipe');
    recipeList.appendChild(recipeDiv);
  });

  // Display warning when there are no recipes in the list
  if (recipes.length > 0) {
	noRecipes.style.display = 'none';
  }
  else {
	noRecipes.style.display = 'flex';
  }
}

// Handle recipe deletion
function handleDelete(event) {
  if (event.target.classList.contains('delete-button')) {
    const index = event.target.dataset.index;
    recipes.splice(index, 1);
    displayRecipes();
	searchBox.value = '';
  }
}

// Search recipes by search query
function search(query) {
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(query.toLowerCase());
  });
  recipeList.innerHTML = '';
  filteredRecipes.forEach(recipe => {
    const recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><img src ="${recipe.image_url}" class="image-styles" /></p>
      <br/>
      <br/>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
      </ul>
      <br/>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <br/>
      <button class="delete-button" data-index="${recipes.indexOf(recipe)}">
		Delete
	  </button>`;
    recipeEl.classList.add('recipe');
    recipeList.appendChild(recipeEl);
  });
}

displayRecipes();

// Add event listeners
form.addEventListener('submit', handleSubmit);
recipeList.addEventListener('click', handleDelete);
searchBox.addEventListener('input', event => search(event.target.value));