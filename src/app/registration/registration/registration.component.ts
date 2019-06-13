import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  registrationError: string;
  registrationForm: any;
  planId;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }


  createRegistrationForm() {
      this.registrationForm = new FormGroup({
              firstName: new FormControl('', {validators : [ Validators.required, Validators.pattern('([a-zA-Z ])+') ]}),
              userName: new FormControl('', {validators : [ Validators.required , Validators.pattern('([a-zA-Z0-9@$.&\'\ ])+') ]}),
              password: new FormControl('', {validators : [Validators.required, Validators.pattern('([a-zA-Z ])+')]}),
          }
      );
  }

  onSubmit() {
      this.registerUser();
  }
  registerUser() {
      const body = {
          firstName: this.registrationForm.value.firstName,
          userName: this.registrationForm.value.userName,
          password: this.registrationForm.value.password
      };
      this.userService.registerUser(body)
          .subscribe((data: any) => {
                  this.registrationError = data.message;
                  this.registrationForm.reset();
              },
              error => {
                  this.registrationForm.reset();
                  this.registrationError = error.error.message;
              });
  }

  ngOnInit() {
      this.createRegistrationForm();
  }
}
