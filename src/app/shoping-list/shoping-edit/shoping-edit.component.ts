import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShopingListActions from '../store/shoping-list.actions';
import * as fromApp from '../../store/app.reducers';;


@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shopingList')
    .subscribe(
      data => {
        if (data.editedIngredientIndex > -1){
          this.editedItem = data.editedIngredient;
          this.editMode= true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
        else{
          this.editMode = false;
        }
      }
    );
  } 

  onSubmit(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.store.dispatch(new ShopingListActions.UpdateIngredient({ ingredient: newIngredient }));
    } else{
      this.store.dispatch(new ShopingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.store.dispatch(new ShopingListActions.DeleteIngredient());
    this.onClear();

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.store.dispatch(new ShopingListActions.StopEdit())
    this.subscription.unsubscribe(); 
  }

}
