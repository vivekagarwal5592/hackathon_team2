import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';
import { LoginResponse } from './login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: String | null | undefined , password: String | null | undefined ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.baseUrl + "/api/auth/login", { "email": email, "password": password });
  }

  signup(user: User) {
    return this.http.post(environment.baseUrl + "/api/auth/signup", user);
  }

}
