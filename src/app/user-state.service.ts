import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor() { }

  isUserLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  getIsUserLoggedIn(): Observable<Boolean> {
    return this.isUserLoggedIn.asObservable();
  }

  setIsUserLoggedIn(isUserLoggedIn: Boolean) {
    this.isUserLoggedIn.next(isUserLoggedIn);
  }
}
