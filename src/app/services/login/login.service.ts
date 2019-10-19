import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Observable, BehaviorSubject, of as Observableof } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  loginUrl: string = 'https://seend34.herokuapp.com/api/v2/auth/login';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): Observable<boolean> {
    if (this.currentUser === null) {
      return Observableof(false);
    } else {
      return Observableof(true);
    }
  }

  loginUser(userCredentials: User) {
    return this.http.post<any>(this.loginUrl, userCredentials).pipe(
      map(user => {
        // const helper = new JwtHelperService();
        // const decodeToken = helper.decodeToken(user['token']);
        // const isExpired = helper.getTokenExpirationDate(user['token']);
        localStorage.setItem('token', user['token']);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  checkTokenExpired() {
    if (this.currentUserSubject.value !== null) {
      const helper = new JwtHelperService();
      const isExpired = helper.getTokenExpirationDate(
        this.currentUserSubject.value['token']
      );

      let now = new Date();
      if (now > isExpired) {
        //check if the token has expired and if it has return true
        //if it has not return false
        return true;
      } else {
        return false;
      }
    } else {
      // if the currentUserSubject is null, just return as if the token is
      // expired and don't grant user permissions
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    console.log(this.currentUserValue);
  }
}
