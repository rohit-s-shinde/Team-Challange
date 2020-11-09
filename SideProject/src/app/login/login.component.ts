import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import {Message} from 'primeng//api';


import { LoginService } from './login.service';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup;
  registerPage = false;

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // route to home if already logged in
    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
    }

    window.scrollTo(0, 0);
    // form is created on page load
    this.loginForm = this.fb.group({
      contactNo: ['', [Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$')]],
      password: ['', [Validators.required]]
    });
  }

  // get user credentials and login
  login() {
    this.loginService.getData().subscribe(
      (response) => {
        var inputData = this.loginForm.value;
        var loggedIn = false;
        for (let data of response) {
          if (data.contactNo.toString() == inputData.contactNo.toString()) {
            if (data.password == inputData.password) {
              this.errorMessage = null;
              // userdatils are stored in the sessionStorage
              sessionStorage.setItem('contactNo', data.contactNo.toString());
              sessionStorage.setItem('userName', data.name);
              console.log(sessionStorage.getItem('contactNo'));
              // refresh app component to reload navbar
              this.appService.refreshApp();
              // user should be navigated to home page on successful login
              this.router.navigateByUrl('/home');
              loggedIn = true;
            }
          }
        }
        if (!loggedIn) {
          this.errorMessage = "Invalid login details, Please try again."
          this.router.navigateByUrl('/login');
        }
      },
      (errorResponse) => {

        if (errorResponse.status == 0) {
          this.errorMessage = "Please check your internet connection!"
          sessionStorage.clear();
        } else {
          // error message if invalid contact number or password
          this.errorMessage = errorResponse.error.message;
          // clears the session storage when there is any error during login
          sessionStorage.clear();
        }
      }
    );
  }

  // navigate to registration page
  getRegisterPage() {
    this.registerPage = true;
    // open register page if the user is not registered already
    this.router.navigateByUrl('/register');
  }
}
