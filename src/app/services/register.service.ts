import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerUrl: string = 'https://seend34.herokuapp.com/api/v2/auth/signup';
  constructor(private http: HttpClient) {}

  registerUser(usercredentials: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, usercredentials);
  }
}
