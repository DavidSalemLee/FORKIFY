import { elements } from '../views/base';
import { limitRecipeTitle } from './searchView'

export const toggleLikeBtn = isLiked => {
    // icons.svg#icon-heart-outlined
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const renderNewFav = recipe => {
    const markup = `
        <li class="favorite-list-item">
            <a class="likes__link" href="#${recipe.ID}">
                <figure class="likes__fig">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>   
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteFavUI = ID => {
    const delItem = document.querySelector(`.likes__link[href="#${ID}"]`)
    delItem.parentNode.removeChild(delItem);
};