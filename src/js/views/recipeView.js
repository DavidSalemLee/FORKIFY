import { elements } from './base'
// import { Fraction } from 'fractional';

export const clearRecipe = () => { elements.recipe.innerHTML = '' };

const renderIngredients = recipe => {
    // Add Each Ingredients to UL
    recipe.ingredients.forEach(ingredient => {
        const ingredientMarkup = `
            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${ingredient.count}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.recipe}
                </div>
            </li>
        `;
        
        document.querySelector('.recipe__ingredient-list').insertAdjacentHTML('beforeend', ingredientMarkup);
        
    });
};

export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servingSize}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-${isLiked? 'heart' : 'heart-outlined'}"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                            
            </ul>

            <button class="btn-small recipe__btn shopping-list">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;

    // Add Recipe HTML to Main Recipe View
    elements.recipe.insertAdjacentHTML('afterbegin', markup);

    renderIngredients(recipe); 

    // Show Like Button Status

    
};

export const updateRecipePortions = ingredients => {
    ingredients.forEach(ingredient => {
        const portionsArr = Array.from(document.querySelectorAll('.recipe__count'));
        portionsArr.forEach((portion, i) => {
            portion.textContent = ingredients[i].count;
        });
    });
};

export const updateServingSize = recipe => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servingSize;
};


