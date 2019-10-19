import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loginservice: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginservice.currentUser.subscribe(value => {
      if (value !== null) {
        this.router.navigate(['/parcels']);
      }
    });
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(loginForm: NgForm) {
    this.loginservice
      .loginUser(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          this.toastr.success(data['message']);
          this.router.navigate(['/parcels']);
        },
        error => {
          this.toastr.error(error['error']['message']);
        }
      );
  }
}
