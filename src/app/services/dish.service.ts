import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return this.delayPromise(DISHES);
     //return this.delayPromise(resolve => resolve(DISHES));
  }

  getDish(id: number): Promise<Dish> {
    return this.delayPromise(
      DISHES.filter((dish) => (dish.id === id))[0]
    );
  }

  getFeaturedDish(): Promise<Dish> {
    return this.delayPromise(
      DISHES.filter((dish) => dish.featured)[0]
    );
  }

  delayPromise(action) {
    return new Promise(resolve => setTimeout(() => resolve(action), 2000));
  }
}
