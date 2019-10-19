import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { LoginComponent } from './user/login/login.component';
import { ParcelListComponent } from './parcels/parcel-list/parcel-list.component';
import { AuthGuard } from './helpers/auth.guard';
import { CreateOrderComponent } from './parcels/create-order/create-order.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'parcels', component: ParcelListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
