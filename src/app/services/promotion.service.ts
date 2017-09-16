import { Injectable } from '@angular/core';

import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions() : Observable<Promotion[]> {
    return Observable.of(PROMOTIONS);
  }

  getPromotion(id: number): Observable<Promotion> {
    return Observable.of(PROMOTIONS.filter((promo) => (promo.id == id))[0]);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return Observable.of(PROMOTIONS.filter((promo) => (promo.featured))[0]);
  }

}
