

let data = {
        "response": {
            "docs": [
                {
                    "content_type": "article",
                    "description": "<p></p>",
                    "image_url": ["/img/baked-rigitoni.jpg"],
                    "title": "baked-rigitoni"
                },
                {
                    "content_type": "article",
                    "description": "<p></p>",
                    "image_url": ["/img/bolognese.jpg"],
                    "title": "bolognese"
                },
                {
                    "content_type": "article",
                    "description": "<p></p>",
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
        <div class="image-list">
            <img src ="${val.image_url}" class="image-styles" />
            <p class="image-title">${val.title}</p>
        </div>`;
    });
}
