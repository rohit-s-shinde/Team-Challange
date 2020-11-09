import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jsonURL = '../assets/loginData.json';

  constructor(private http: HttpClient) { }

  // get user credentials form backend
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonURL);
  }
}
