import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginError: string;
    loginForm: any;
    planId;

    constructor(private formBuilder: FormBuilder, private userService: UserService) { }


    createRegistrationForm() {
        this.loginForm = new FormGroup({
                userName: new FormControl('', {validators : [ Validators.required , Validators.pattern('([a-zA-Z0-9@$.&\'\ ])+') ]}),
                password: new FormControl('', {validators : [Validators.required, Validators.pattern('([a-zA-Z0-9@$.&\' ])+')]}),
            }
        );
    }

    onSubmit() {
        this.registerUser();
    }
    registerUser() {
        const body = {
            userName: this.loginForm.value.userName,
            password: this.loginForm.value.password
        };
        this.userService.login(body)
            .subscribe((data: any) => {
                    this.loginForm.reset();
                    this.loginError = data.body.message;
                },
                error => {
                    this.loginForm.reset();
                    if (error && error.error && error.error.message) {
                        this.loginError = error.error.message;
                    }
                });
    }

    ngOnInit() {
        this.createRegistrationForm();
    }
}
