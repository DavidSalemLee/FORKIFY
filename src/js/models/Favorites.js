import { elements } from '../views/base';

export default class Favorites {
    constructor() {
        this.favoritesList = [];
    }

    addFav(ID, title, publisher, image) {
        // Create new Fav Item (Obj)
        const favObj = {
            ID,
            title,
            publisher,
            image, 
        }
        
        this.favoritesList.push(favObj);

        // Updates Local Storage
        this.persistLocalStorage();
    }

    delFav(ID) {
        const delIndex = this.favoritesList.findIndex(fav => { return fav.ID === ID });
        this.favoritesList.splice(delIndex, 1);

        // Updates Local Storage
        this.persistLocalStorage();
    }

    isLiked(ID) {
        return this.favoritesList.findIndex(fav => fav.ID === ID) !== -1;
    }
    
    persistLocalStorage() {
        const data = JSON.stringify(this.favoritesList);
        localStorage.setItem('favorites', data);
    }

    readLocalStorage() {
        const data = JSON.parse(localStorage.getItem('favorites'));
        this.favoritesList = data;
    }
}