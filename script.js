const apiKey = '6f68c7e0653348398e8c0227851ba33d';
function buscarRecetas() {
    const ingredientInput = document.getElementById('ingredient-input').value;
    const cuisineSelect = document.getElementById('cuisine-select').value;
    let url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}&apiKey=${apiKey}`;
    if (cuisineSelect) {
        url += `&cuisine=${cuisineSelect}`;
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const recipesContainer = document.getElementById('recipes-container');
        recipesContainer.innerHTML = '';
        data.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <button onclick="mostrarReceta(${recipe.id})">Ver Receta</button>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    })
    .catch(error => console.error('Error:', error));
}

function mostrarReceta(recipeId) {
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const recipeDetails = document.getElementById('recipe-details');
        recipeDetails.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.image}" alt="${data.title}">
            <h3>Ingredientes:</h3>
            <ul>
                ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
            </ul>
            <h3>Pasos:</h3>
            <ol>
                ${data.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('')}
            </ol>
        `;
    })
    .catch(error => console.error('Error:', error));
}
