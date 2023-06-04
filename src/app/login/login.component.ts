import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserStateService } from '../user-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';
import { LoginResponse } from '../login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router,
    private userService: UserService,
    private userStateService: UserStateService,
    public _snackBar: MatSnackBar) { }

  loginDetails = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  login() {
    // this.userStateService.setIsUserLoggedIn(true);
    // this.router.navigateByUrl("/parking-lot");
    let loginResponse = this.userService.login(this.loginDetails.value.email, this.loginDetails.value.password);
    loginResponse.subscribe((each: LoginResponse) => {
      if (each.error == null) {
        var res = this.getDecodedAccessToken(String(each.ACCESS_TOKEN));
        this.userStateService.setIsUserLoggedIn(true);
        this.userStateService.setUserDetails(res.user);
        localStorage.setItem("userId", res.user.id);
        this.router.navigateByUrl("/parking-lot");
      }
    },
    (error) => {
      this._snackBar.open("please enter valid username and password", "close");
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
