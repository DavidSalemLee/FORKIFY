import { elements } from './base'

export const renderShoppingList = list => {
    list.forEach(item => {
        const markup = `
        <li class="shopping__item" data-shoppingID="${item.ID}">
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="100">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredients}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
        `;

        elements.shoppingList.insertAdjacentHTML('beforeend', markup);
    });
};

export const deleteShoppingItem = ID => {
    const shoppingArr = Array.from(document.querySelectorAll('.shopping__item'));
    const delElement = shoppingArr.find(element => element.dataset.shoppingid === ID);
    
    delElement.parentNode.removeChild(delElement);
};