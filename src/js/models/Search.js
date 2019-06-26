import axios from 'axios';
import { elements } from '../views/base';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getSearchResults() {
        // const cors = 'https://corsproxy.github.io/';
        
        try {
            const recipesData = await axios(`https://www.food2fork.com/api/search?key=${elements.apiKey}&q=${this.query}`);
            this.result = recipesData.data.recipes;
            
        } catch (error) {
            alert('Search Error - Food2Fork API Limit Reached. 50 results/Day for Demo Purposes');
        }
    }
};


