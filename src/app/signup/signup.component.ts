import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // name: string = "";
  // email: string = "";
  // phoneNumber: string = "";
  // password: string = "";

  userDetails = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var user: User = {name: this.userDetails.value.name, email: this.userDetails.value.email, phone: this.userDetails.value.phone, password: this.userDetails.value.password, role: "USER"}
    this.userService.signup(user).subscribe((response: any) => {
      if (response.error != null) {
        this._snackBar.open(response.error, "close");
      }
    });
  }

}
