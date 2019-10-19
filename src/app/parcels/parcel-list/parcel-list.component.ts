import { Component, OnInit } from '@angular/core';
import { UserordersService } from 'src/app/services/parcels/userorders.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.scss']
})
export class ParcelListComponent implements OnInit {
  parcels = [];
  constructor(
    private userorderservice: UserordersService,
    private toastr: ToastrService,
    private authService: LoginService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    //when the component initializes lets call the userorderservice and get
    this.spinner.show();

    this.userorderservice.getparcels().subscribe(
      data => {
        this.parcels = data['orders'];
      },
      error => {
        this.spinner.show();
        // this.toastr.error(error);
      }
    );
  }
  // onCall() {
  //   this.spinner.show();
  //   this.userorderservice.getparcels().subscribe(
  //     data => {
  //       this.spinner.hide();
  //       for (let parcel of data['orders']) {
  //         this.parcels.push(parcel);
  //         console.log(this.authService.currentUserValue);
  //       }
  //       // this.parcels.push(data['orders']);
  //       console.log(this.parcels.length);
  //     },
  //     error => {
  //       this.spinner.hide();
  //       console.log(localStorage.getItem('token'));
  //       console.log(error);
  //     }
  //   );
  // }
}
