import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { AuthService } from '../services/auth.service';
import { registerStart } from '../state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  validations: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      city: "",
      country: "",
      zip: ""
    })
  }
  onRegisterSubmit(){
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const email = this.loginForm.value.email;
    const city = this.loginForm.value.city;
    const country = this.loginForm.value.country;
    const zip = this.loginForm.value.zip;
    const role = this.authService.getRole();
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(registerStart({username, email, password, role, city, country, zip}));

  }

}
