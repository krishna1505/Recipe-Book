document.addEventListener('DOMContentLoaded', () => {
    displayRecipes();
});

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const imageInput = document.getElementById('recipe-image');
    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const imageUrl = event.target.result;

        const recipe = {
            name,
            ingredients: ingredients.split(','),
            imageUrl
        };

        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
}

function displayRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeContainer = document.getElementById('recipes');
    recipeContainer.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.imageUrl;

        const recipeName = document.createElement('h3');
        recipeName.innerText = recipe.name;

        const recipeIngredients = document.createElement('p');
        recipeIngredients.innerText = `Ingredients: ${recipe.ingredients.join(', ')}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteRecipe(index);

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(recipeIngredients);
        recipeCard.appendChild(deleteButton);
        recipeContainer.appendChild(recipeCard);
    });
}

function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}
