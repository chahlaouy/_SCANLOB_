import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userProfile = new FormData();


  userInfo: FormGroup;

  authenticatedUser: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // this.store.select(getAuthenticatedUser).subscribe(user => {
    //   this.authenticatedUser = user.user
    // });
    this.initializeForm(this.authenticatedUser);
  }


  initializeForm(user){
    this.userInfo = this.fb.group({
      id: "",
      userImg: "",
      username: "",
      email: "",
      age: "",
      gender: "",
      phone: "",
      country: "",
      state: "",
      zip: ""
    })
  }


  onUserImgChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userInfo.patchValue({
        userImg: file
      });
    }
  }

  onUserInfoSubmit(){


    this.userProfile.append('userImg', this.userInfo.get('userImg').value);
    this.userProfile.append('id', this.userInfo.get('id').value);
    this.userProfile.append('username', this.userInfo.get('username').value);
    this.userProfile.append('email', this.userInfo.get('email').value);
    this.userProfile.append('age', this.userInfo.get('age').value);
    this.userProfile.append('gender', this.userInfo.get('gender').value);
    this.userProfile.append('phone', this.userInfo.get('phone').value);

    const user = this.userProfile;

    // this.store.dispatch(setLoadingSpinner({status: true}));
    // this.store.dispatch(updateUserInfoStart({user}))
  }


}
