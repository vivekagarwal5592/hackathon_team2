import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor() { }

  isUserLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  userDetails: BehaviorSubject<User> = new BehaviorSubject({});

  getIsUserLoggedIn(): Observable<Boolean> {
    return this.isUserLoggedIn.asObservable();
  }

  setIsUserLoggedIn(isUserLoggedIn: Boolean) {
    this.isUserLoggedIn.next(isUserLoggedIn);
  }

  getUserDetails(): Observable<User> {
    return this.userDetails.asObservable();
  }

  setUserDetails(user: User) {
    this.userDetails.next(user);
  }
}
