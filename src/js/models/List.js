import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.shoppingList = [];
    }

    addItem(count, unit, ingredients) {
        const listObj = {
            ID: uniqid(),
            count,
            unit,
            ingredients
        }
        this.shoppingList.push(listObj);
    }

    deleteItem(ID) {
        const delIndex = this.shoppingList.findIndex(el => el.ID === ID);
        this.shoppingList.splice(delIndex, 1);
    }

    updateCount(count, ID) {
        const element = this.shoppingList.find(el => el.ID === ID);
        element.count = count;
    }
}