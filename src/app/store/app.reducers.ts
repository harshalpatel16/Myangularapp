import * as fromShopingList from '../shoping-list/store/shoping-list.reducers'
import * as fromAuth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shopingList: fromShopingList.State,
    auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
    shopingList: fromShopingList.shopingListReducer,
    auth: fromAuth.authReducer
};