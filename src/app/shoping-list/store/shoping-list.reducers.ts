import * as ShopingListActions from './shoping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface State{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 3),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shopingListReducer(state= initialState, action: ShopingListActions.ShopingListActions){
    switch (action.type){
        case ShopingListActions.ADD_INGREDIENT: 
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };
        case ShopingListActions.ADD_INGREDIENTS:
        return{
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
        };
        case ShopingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
            ...ingredient,
            ...action.payload.ingredient
        };
        const ingredients = [...state.ingredients];
        ingredients[state.editedIngredientIndex] = updatedIngredient;
        return{
            ...state,
            ingredients: ingredients,
            editedIngredient: null,
            editedIngredientIndex: -1
        };
        case ShopingListActions.DELETE_INGREDIENT:
        const oldIngredients = [...state.ingredients];
        oldIngredients.splice(state.editedIngredientIndex, 1)
        return{
            ...state,
            ingredients: oldIngredients,
            editedIngredient: null,
            editedIngredientIndex: -1
        };
        case ShopingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]};
        return{
            ...state,
            editedIngredient: editedIngredient,
            editedIngredientIndex: action.payload
        };
        case ShopingListActions.STOP_EDIT:
        return{
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1
        }
        default:
        return state;

    }
}