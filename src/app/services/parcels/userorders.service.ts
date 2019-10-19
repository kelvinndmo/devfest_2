import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + localStorage.token
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserordersService {
  user_id = JSON.parse(localStorage.getItem('user'));

  parcelsUrl = 'https://seend34.herokuapp.com/api/v2';

  constructor(private http: HttpClient) {}

  getparcels(): Observable<any> {
    return this.http.get<any>(
      this.parcelsUrl + `/users/${this.user_id['id']}/parcels`
    );
  }

  postParcel(parcelDetails): Observable<any> {
    return this.http.post<any>(this.parcelsUrl + '/parcels', parcelDetails);
  }
}
