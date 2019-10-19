import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GithubService } from './services/github/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'send';
  isLoggedIn: boolean;
  users = []

  // LoggedIn() {
  //   this.authService.isLoggedIn.subscribe(value => {
  //     this.isLoggedIn = value;
  //   });
  // }

  constructor(
    private authService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private githubService:GithubService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      if (value === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const currentUser = this.authService.currentUserValue;
    this.githubService.getUsers().subscribe(users => {
      console.log(users);
      
      this.users = users
      
    })
  }

  logOut() {
    this.authService.logout();
    console.log(this.authService.isLoggedIn);
    this.toastr.success('You were successfully logged out');
    this.router.navigate(['/']);
  }
}
