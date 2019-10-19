import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { LoginService } from '../services/login/login.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: LoginService,
    private route: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          console.log('helllo');
          this.authService.logout();
          console.log(err);

          this.toastr.error(err['error']['msg']);

          this.route.navigate(['/login']);
        }
        const error = err.error.message || err.statusText;
        this.toastr.error(error);
        return throwError(error);
      })
    );
  }
}
