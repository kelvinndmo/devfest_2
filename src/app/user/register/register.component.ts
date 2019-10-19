import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //delcarations
  registerForm: FormGroup;

  user: User = {
    username: 'ndemo234',
    email: 'novak@gmail.co.ke',
    password: 'Novak399999'
  };
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    //we will declare our forms here so that they will be picked when the component initializes.
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  save(registerForm: NgForm) {
    this.spinner.show();
    console.log(this.registerForm.value);
    this.registerService.registerUser(this.registerForm.value).subscribe(
      result => {
        this.spinner.hide();
        this.toastr.success(result['message']);
        this.router.navigate(['/']);
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error['error']['message']);
        console.log(error['error']);
      }
    );
  }

  // callRegisterUser() {
  //   this.registerUser(this.user);
  // }

  // registerUser(register: User) {
  //   this.registerService.registerUser(register).subscribe(
  //     response => {
  //       console.log(response);
  //     },
  //     error => {
  //       console.log(error.error.message);
  //     }
  //   );
  // }
}
