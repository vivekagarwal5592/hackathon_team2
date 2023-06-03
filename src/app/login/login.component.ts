import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(private router: Router,
    private userService: UserService) { }

  loginDetails = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  login() {
    let loginResponse = this.userService.login(this.loginDetails.value.email, this.loginDetails.value.password);
    loginResponse.subscribe((each) => {
      if (each.error == null) {
        this.router.navigateByUrl("/parking-lot");
      }
    });
  }

}
