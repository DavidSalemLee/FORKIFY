// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List'
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as favoritesViews from './views/favoritesView'
import { elements, renderLoader, clearLoader } from './views/base';
// import { createPublicKey } from 'crypto';
import Favorites from './models/Favorites';
// import { STATUS_CODES } from 'http';



/** Global State of the app
*- .search Object
*- .recipe Object
*- .shoppingList Object
*- .likedRecipes Object
*/
const state = {}; 


/**
 * SEARCH CONTROLLER  
 */
// EVENT LISTENER - Search & Pagination
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const pageJump = Number(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, pageJump);
    } 
});

const controlSearch = async () => {
    // 1. Take input and use it as query and run search
    const query = searchView.getInput();
         
    if (query) {
        // 2. If query exists, then create a new search object and add to state
        state.search = new Search(query);

        // 3. Clear UI fields
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes); 
        
        // Clear Existing Recipe with New Search
        recipeView.clearRecipe();

        try {
            // 4. Get search results
            await state.search.getSearchResults();
    
            // 5. Show results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
            

        } catch (err) {
            alert('Processing search went wrong');
        }
    }
};


/** 
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // 1. Get ID from URL
    let ID = window.location.hash.replace('#', '');
    
    if (ID) {
        // 2. New State .recipe Object
        state.recipe = new Recipe(ID);
        
        // 3. Clear Previous Results + Loader
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // 4. Get Recipe Data
        try {
            await state.recipe.getRecipe();
            // 5. Calculate Serving Time and Size
            state.recipe.calcTime();
            state.recipe.calcServingSize();
            state.recipe.parseIngredients();
            
            // 6. Render on UI + clear loader
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.favorites.isLiked(ID));

            if (state.search) { searchView.highlightSearch(ID) };
        } catch (error) {
            alert(' Unable to get Recipe - Food2Fork API Limit Reached. 50 results/Day for Demo Purposes');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// EVENT LISTENER - Recipe Servings Button Inc/Dec, Add to ShoppingList
elements.recipe.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease Recipe Portions 
        if (state.recipe.servingSize > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateRecipePortions(state.recipe.ingredients);
            recipeView.updateServingSize(state.recipe);
        }
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        // Increase Recipe Portions
        state.recipe.updateServings('inc');
        recipeView.updateRecipePortions(state.recipe.ingredients);
        recipeView.updateServingSize(state.recipe);
    } else if (event.target.matches('.shopping-list, .shopping-list *')) {
        // Add to Shopping List Button
        controlShoppingList();  
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        // Add to Favorites List
        controlFavoriteList(state.recipe.ID);
    }
});



/**
 * SHOPPING LIST CONTROLLER
 */
const controlShoppingList = () => {
    // New State for Shopping List
    state.list = new List();
    // Add State Recipe Ingredients to State List Object 
    state.recipe.ingredients.forEach(ingredient => {
        state.list.addItem(ingredient.count, ingredient.unit, ingredient.recipe);
    });
    
    // Render Shopping List on UI 
    listView.renderShoppingList(state.list.shoppingList); 
    
};

// Shopping Event Listeners - Shopping List
// Delete List Item
elements.shopping.addEventListener('click', e => {
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        listView.deleteShoppingItem(e.target.closest('.shopping__item').dataset.shoppingid);
    }
});


/**
 *  FAVORITES LIST CONTROLLER   
 */

 
// Favorites Event Handler - Local Storage for Likes
window.addEventListener('load', () => {
    // Make new State Favorites Object    
    state.favorites = new Favorites();
    
    // Read Local Storage and add it to state.favorites
    if (localStorage.getItem('favorites')) {
        state.favorites.readLocalStorage();

        // Render Favorites List to Menu
        state.favorites.favoritesList.forEach(fav => {
            favoritesViews.renderNewFav(fav);
        });
    }
    
});

const controlFavoriteList = ID => {
    if (state.recipe) {
        if (!state.favorites) {
            // Make new State Favorites Object
            
        }
           
        // Liked Item doesn't exist
        if (!state.favorites.isLiked(ID)) {
            // Add Recipe Item to Favorites Object
            state.favorites.addFav(ID, state.recipe.title, state.recipe.publisher, state.recipe.image);
            
            // Toggle the Btn
            favoritesViews.toggleLikeBtn(true);

            // Render Favorite List Item to UI
            favoritesViews.renderNewFav(state.recipe);

        // Liked Item exists. Delete it and Toggle
        } else {
            // Delete from list
            state.favorites.delFav(ID);

            // Toggle the Btn
            favoritesViews.toggleLikeBtn(false);

            // Delete from UI
            favoritesViews.deleteFavUI(ID);
        }
    }
};


