import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserordersService } from 'src/app/services/parcels/userorders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  createOrderForm: FormGroup;
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private userodersService: UserordersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createOrderForm = this.fb.group({
      destination: ['', [Validators.required, Validators.minLength(3)]],
      origin: ['', [Validators.required, Validators.minLength(3)]],
      weight: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit(createOrderForm: FormGroup) {
    this.spinner.show();
    console.log(this.createOrderForm.value);
    this.userodersService
      .postParcel(this.createOrderForm.value)
      .subscribe(data => {
        this.spinner.hide();
        this.toastr.success(data['message']);
      });
  }
}
