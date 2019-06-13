import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  login(logindata) {
    return this.http.post(`${environment.apiUrl}/users/login`, logindata, { observe: 'response' });
  }
}
