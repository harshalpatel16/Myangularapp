import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import * as ShopingListActions from './store/shoping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {
  shopingListState: Observable<{ingredients: Ingredient[]}>;
 

  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shopingListState = this.store.select('shopingList');
    
  }

  onEditItem(index: number){
    this.store.dispatch(new ShopingListActions.StarEdit(index));
  }

 
}
