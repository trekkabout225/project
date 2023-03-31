

let data = {
        "response": {
            "docs": [
                {
                    "content_type": "article",
                    "description": ["<li>1 tablespoon butter</li>",
                                    "<li>2 tablespoons olive oil</li>",
                                    "<li>1 onion (chopped)</li>",
                                    "<li>1 (26-ounce) jar tomato pasta sauce (or homemade )</li>",
                                    "<li>3 tablespoons water</li>"],
                    "image_url": ["/img/baked-rigitoni.jpg"],
                    "title": "baked-rigitoni"
                },
                {
                    "content_type": "article",
                    "description": ["<li>1 tablespoon butter</li>",
                                    "<li>2 tablespoons olive oil</li>",
                                    "<li>1 onion (chopped)</li>",
                                    "<li>1 (26-ounce) jar tomato pasta sauce (or homemade )</li>",
                                    "<li>3 tablespoons water</li>"],
                    "image_url": ["/img/bolognese.jpg"],
                    "title": "bolognese"
                },
                {
                    "content_type": "article",
                    "description": ["<li>226 grams fettuccine (- ½ pound)</li>",
                                    "<li>6 cups water</li>",
                                    "<li>1 to 1.5 teaspoons salt (or add as required)</li>",
                                    "<li>3 to 4 tablespoons Butter (- 30 grams, unsalted or salted)</li>",
                                    "<li>½ teaspoon garlic (- finely chopped)</li>"],
                    "image_url": ["/img/fettuccine-alfredo.jpg"],
                    "title": "fettuccine-alfredo"
                }
            ]
        }
};

const recipeList = document.querySelector('#target');

data = data.response.docs;

// Display recipes in recipe list
function displayRecipes() {
    recipeList.innerHTML = '';
    data.forEach((val, key) => {  
        recipeList.innerHTML += `
        <ul class="image-list">
            <img src ="${val.image_url}" class="image-styles" />
            <p class="image-title">${val.title}</p>
        </ul>
        <p><strong>Ingredients:</strong></p>
        <ul class="ingredient-styles">${val.description}</ul>
        <br/>
        <hr>`;
    });
}

displayRecipes();
