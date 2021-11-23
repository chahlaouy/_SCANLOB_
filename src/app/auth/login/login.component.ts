import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  authError: any;
  validations: any;

  constructor(
      private fb: FormBuilder,
      private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }
  onLoginSubmit(){
    const email = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(loginStart({email, password}));
  }
}

