export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPagination: document.querySelector('.results__pages'), 
    recipe: document.querySelector('.recipe'), 
    recipeIngredientsList: document.querySelector('.recipe__ingredient-list'),
    shopping: document.querySelector('.shopping'),
    shoppingList: document.querySelector('.shopping__list'),
    addToShoppingBtn: document.querySelector('.recipe__btn'),
    likesList: document.querySelector('.likes__list'),
    apiKey: '751c2844e56e41e8f2fe2da24d9d87b6'
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader); 
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};