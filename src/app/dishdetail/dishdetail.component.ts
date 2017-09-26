import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from "../shared/dish";
import {DishService} from "../services/dish.service";
import {Comment} from "../shared/comment";

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    'rating': '',
    'comment': '',
    'author': '',
    'date': ''
  };
  validationMessages = {
    'rating': { /* no constraints*/},
    'author': {
      'required':      'Author is a required field.',
      'minlength':     'Last Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
    },
  };




  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe( dishIds => this.dishIds = dishIds );
    this.route.params
      .switchMap( (params: Params) => this.dishservice.getDish(+params['id']) )
      .subscribe( dish => {this.dish = dish; this.setPrevId(dish.id)} );
    this.createForm();
  }

  setPrevId(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Comment Form
  // -------------------------------------------------------------------------------------------------------------------

  private createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: ''
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    //this.commentForm.reset();
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.commentForm.setValue({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
    this.commentForm.get("author").markAsPristine();
    this.commentForm.get("author").markAsUntouched();

    // this.commentForm.markAsPristine();
    this.commentForm.reset();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) return;
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


}
