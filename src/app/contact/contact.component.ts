import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from "../shared/feedback";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  /*
  Transcript: This JavaScript object, as you see, contains four elements here. Now, whenever I do the form validation, recall that I already specified that I am going to create a new method called onValueChanged. Inside the onValueChanged, the way the code is written is that if any error is detected, a string containing the message corresponding to that error will be added into this JavaScript object. So this way, within my code, I can do the form validation. Now, in addition to this, I will now define a few validation messages. Now, this particular pattern of doing things I learned by reading the documentation on form validation in the angular.io website. So, they have a whole documentation on how to do form validation and a link to which is available in the additional resources of this chapter and also the previous chapters on Angular forms. So there, in that particular document, they prescribed this as a way of doing form validation. And I found that to be very intuitive, so I also adopted the same pattern for doing form validation in code. So along with here, I'm going to define the validation messages for all the possible fields here. So for the firstname field, I will define a few validation messages here. So I would say, required, and then say, First Name is required.
   */
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (this.feedbackForm) return;
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[key] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }
}
