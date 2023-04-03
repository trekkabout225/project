// Get DOM elements
const form = document.querySelector('form');
const recipeList = document.querySelector('#recipe-list');
const searchBox = document.getElementById('search-box');
const noRecipes = document.getElementById('no-recipes');

// Get data and define recipes array

// async function getData(url) {
//   const response = await fetch(url);
//   console.log("response: ", response);
//   return await response.json();       
// }
                
// let recipes = getData("/db.json").then(data => console.log("data: ", data));

let data = fetch("db.json")
            .then(response => {
              console.log("response: ", response);
              return response.json();
            })
            .then(data => console.log("data: ", data));
                
let recipes = [data];
// let recipes = [
//         {
//           "name": "Baked Rigatoni",
//           "imageUrl": "/img/baked-rigitoni.jpg",
//           "ingredients": ["<li>1 tablespoon butter</li>",
//                           "<li>2 tablespoons olive oil</li>",
//                           "<li>1 onion (chopped)</li>",
//                           "<li>1 (26-ounce) jar tomato pasta sauce</li>",
//                           "<li>3 tablespoons water</li>"],
//           "directions": "<p>Lorem ipsum dolor sit amet. Sed</p><p> numquam aspernatur et facilispossimus</p><p> nam autem expedita id obcaecati</p> repellendus eos culpa earum."
//         },
//         {
//           "name": "Bolognese",
//           "imageUrl": "/img/bolognese.jpg",
//           "ingredients": ["<li>1 tablespoon butter</li>",
//                           "<li>2 tablespoons olive oil</li>",
//                           "<li>1 onion (chopped)</li>",
//                           "<li>1 (26-ounce) jar tomato pasta sauce</li>",
//                           "<li>3 tablespoons water</li>"],
//           "directions": "<p>Lorem ipsum dolor sit amet. Sed</p><p> numquam aspernatur et facilispossimus</p><p> nam autem expedita id obcaecati</p> repellendus eos culpa earum."
//         },
//         {
//           "name": "Fettuccine Alfredo",
//           "imageUrl": "/img/fettuccine-alfredo.jpg",
//           "ingredients": ["<li>226 grams fettuccine (- ½ pound)</li>",
//                           "<li>6 cups water</li>",
//                           "<li>1 to 1.5 teaspoons salt (or add as required)</li>",
//                           "<li>3 to 4 tablespoons Butter (unsalted or salted)</li>",
//                           "<li>½ teaspoon garlic (- finely chopped)</li>"],
//           "directions": "<p>Lorem ipsum dolor sit amet. Sed</p><p> numquam aspernatur et facilispossimus</p><p> nam autem expedita id obcaecati</p> repellendus eos culpa earum."
//         }
// ];

// Handle form submit

function addRecipe(event) {
  // Prevent default form submission behavior
  event.preventDefault();
  
  // Get recipe name, ingredients, image (if uploaded), and method input values
  const nameInput = document.querySelector('#recipe-name');
  const imageInput = document.querySelector('#image-name');
  const ingredientsInput = document.querySelector('#recipe-ingredients');
  const directionsInput = document.querySelector('#recipe-directions');
  const name = nameInput.value.trim();
  const ingredients = ingredientsInput.value.trim().split(',').map(i => i.trim());
  const directions = directionsInput.value.trim();
  
  // Create new recipe object and add it to recipes array
  const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result;
    const newRecipe = { name, imageUrl, ingredients, directions };
    recipes.push(newRecipe);
    
    // Clear form inputs
    nameInput.value = '';
    imageInput.value = '';
    ingredientsInput.value = '';
    directionsInput.value = '';
    
  // Add new recipe to recipe list
  displayRecipes();
  };
  reader.readAsDataURL(imageInput.files[0]);
}

// Display recipes in recipe list
function displayRecipes() {
  recipeList.innerHTML = '';
  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
	// Create div to display the individual recipe, for each recipe
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><img src="${recipe.imageUrl}" class="image-styles" /></p>
      <br/>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients?.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
      <br/>
      <p><strong>Directions:</strong></p>
      <p>${recipe.directions}</p>
      <br/>
      <button class="delete-button" data-index="${index}">Delete</button>`;
    recipeDiv.classList.add('recipe');
    recipeList.appendChild(recipeDiv);
  });

  // Display warning when there are no recipes in the list
  if (recipes.length > 0) {
	  noRecipes.style.display = 'none';
  } else {
	  noRecipes.style.display = 'flex';
  }
}

// Handle recipe deletion
function deleteRecipe(event) {
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
      <p><img src ="${recipe.imageUrl}" class="image-styles" /></p>
      <br/>
      <br/>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients?.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
      <br/>
      <p><strong>Directions:</strong></p>
      <p>${recipe.directions}</p>
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
form.addEventListener('submit', addRecipe);
recipeList.addEventListener('click', deleteRecipe);
searchBox.addEventListener('input', event => search(event.target.value));