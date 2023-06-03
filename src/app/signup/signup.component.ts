import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    phoneNumber: new FormControl(''),
    password: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Handle form submission here
    // console.log('Form submitted:', this.name, this.email, this.phoneNumber, this.password);
    // Add your logic for saving the form data or making an API request
    console.log("submit");
  }

}
