import axios from 'axios';
import { elements } from '../views/base';



export default class Recipe {
    constructor (ID) {
        this.ID = ID;
    }
    
    async getRecipe () {
        try {
            const promiseObject = await axios(`https://www.food2fork.com/api/get?key=${elements.apiKey}&rId=${this.ID}`);
            this.title = promiseObject.data.recipe.title;
            this.publisher = promiseObject.data.recipe.publisher;
            this.image = promiseObject.data.recipe.image_url;
            this.url = promiseObject.data.recipe.source_url;
            this.ingredients = promiseObject.data.recipe.ingredients;
        } catch (error) {
            alert(`Recipe Error - ${error}`);
        }
    };

    calcTime () {
        const period = Math.ceil(this.ingredients.length / 3);
        const time = period * 15;
        this.time = time;
    }

    calcServingSize () {
        this.servingSize = 4;
    }

    // recipeCountFormatter(num) {
        
    // }

    parseIngredients () {
        const revisedWords = ['cup', 'cup', 'oz', 'oz', 'package', 'package', 'tbsp', 'tbsp', 'tsp', 'tsp', 'jar', 'jar', 'kg', 'kg', 'g', 'g', 'tbsp', 'tbsp', 'tsp', 'lbs'];
        const oldWords = ['cups', 'cup', 'ounces', 'ounce', 'packages', 'package', 'tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'jars', 'jar', 'kilograms', 'kilogram', 'grams', 'gram', 'Tb.', 'Tb', 'tsp.', 'lbs'];

        const newIngredients = this.ingredients.map(ingredient => {
            // Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
           

            // Replace units with standardized words
            oldWords.forEach((word, i) => {
                ingredient = ingredient.replace(word, revisedWords[i]);   
            });

            // Parse ingredients into COUNT, UNIT, RECIPE
            const ingredientArr = ingredient.split(' ');
            const unitIndex = ingredientArr.findIndex(word => revisedWords.includes(word));

            let objIng = {};

            if (unitIndex > -1) {
                // Count, Unit and Recipe
                let count;
                const countArr = ingredientArr.slice(0, unitIndex);

                if (countArr.length === 1) {
                    // just replace "-" with "+" and evaluate it
                    count = eval(countArr[0].replace('-', '+'));
                    //count = eval(countArr[0].replace('-', '+'));
                } else {
                    // take all array elements and join with + and eval it
                    count = eval(countArr.join('+'));
                    //count = eval(countArr.join('+'));
                }

                objIng = {
                    count,
                    unit: ingredientArr[unitIndex],
                    recipe: ingredientArr.slice(unitIndex + 1).join(' ')
                }
                // console.log(objIng);

            } else if (Number(ingredientArr[0])) {
                // Count, Recipe
                objIng = {
                    count: Number(ingredientArr[0]),
                    unit: '',
                    recipe: ingredientArr.slice(1).join(' ')
                }
                // console.log(objIng);
            } else if (unitIndex === -1) {
                // Recipe only
                
                objIng = {
                    count: 1,
                    unit: '',
                    recipe: ingredientArr.join(' ')
                }
                // console.log(objIng);

            }
            
            return objIng;
        });
        
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // Update Serving Size
        const newServing = type === 'dec' ? this.servingSize - 1 : this.servingSize + 1;

        // Update Ingredient Portions
        this.ingredients.forEach(ingredient => {
            ingredient.count *= newServing / this.servingSize;
        }); 

        this.servingSize = newServing;  
    }
}

