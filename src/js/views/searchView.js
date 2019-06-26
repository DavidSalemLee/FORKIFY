import { elements } from './base'

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => {
    while (elements.searchResList.firstChild) {
        elements.searchResList.removeChild(elements.searchResList.firstChild);
    }
    elements.searchResPagination.innerHTML = '';
};

export const limitRecipeTitle = (title, limit = 18) => {

    if (title.length > limit) {
        const titleArr = title.split(' ');
        const newTitleArr = [];
        let charCounter = 0;

        // titleArr.forEach(word => {
        //     if (charCounter < limit) {
        //         charCounter += word.length;
        //         newTitleArr.push(word);
        //     } 
        // });

        titleArr.reduce((acc, word) => {
            if (acc + word.length <= limit) {
                newTitleArr.push(word);
            }
            return acc + word.length;
        }, 0);

        return `${newTitleArr.join(' ')}...`;
    }

    return title; 
};

// Highlight Search Query Active
export const highlightSearch = ID => {
    const highlightArr = Array.from(document.querySelectorAll('.results__link'));
        highlightArr.forEach(el => {
            el.classList.remove('results__link--active')
        });
    if (document.querySelector(`.results__link[href*="#${ID}"]`)) {
        document.querySelector(`.results__link[href*="#${ID}"]`).classList.add('results__link--active');
    }
    
};

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link " href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
    
};

const createButtons = (page, type) => {
    // page = Number(page);
    let markup = `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type==='prev' ? page - 1 : page + 1}</span>    
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;
    elements.searchResPagination.insertAdjacentHTML('afterbegin', markup);
};

const renderButtons = (page, totalAmtRes, resPerPage) => {
    const lastPage = Math.ceil(totalAmtRes / resPerPage);
    
    // 1. Show only NEXT btn when on first page
    if (lastPage > 1 && page === 1) {
        // Only NEXT button (First page)
        createButtons(page, 'next');
    } else if (page < lastPage) {
        // Show NEXT & PREV buttons
        createButtons(page, 'next');
        createButtons(page, 'prev');
        
    } else if (page === lastPage && lastPage > 1) {
        // Only PREV button (Last Page)
        createButtons(page, 'prev');
    }
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of Current Page
    const recipeStart =  (page - 1) * resPerPage;
    const recipeEnd = page * resPerPage; 

    recipes.slice(recipeStart, recipeEnd).forEach(renderRecipe);

    // Render Pagination Buttons
    renderButtons(page, recipes.length, resPerPage);
};


