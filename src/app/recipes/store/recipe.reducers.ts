import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from '../../store/app.reducers';


export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State{
   recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'A PavBhaji Recipe',
            'Bombay PavBhaji', 
            'http://xantilicious.com/wp-content/uploads/2017/01/IMG_1360123.jpg',
            [
                new Ingredient('Onion', 1),
                new Ingredient('Tomatoes', 3)
            ]),
        new Recipe(
            'A Dabeli Recipe', 
            'Kachchhi Dabeli ', 
            'https://i0.wp.com/www.cookingfromheart.com/wp-content/uploads/2017/06/Kutchi-Dabeli-8.jpg?resize=1024%2C680',
            [
                new Ingredient('Buns', 4),
                new Ingredient('Masala', 1)
            ])
      ]
};


export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions){
    switch (action.type){
        case(RecipeActions.SET_RECIPES):
            return{
                ...state,
                recipes: [...action.payload]
            };
        case(RecipeActions.ADD_RECIPE):
            return{
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case(RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return{
                ...state,
                recipes: recipes
            };
        case(RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return{
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }

}