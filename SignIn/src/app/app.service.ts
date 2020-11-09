import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }
  get refreshNeeded$() {
    return this.refreshNeeded;
  }

  private refreshNeeded = new Subject<void>();


  refreshApp() {
    this.refreshNeeded.next();
  }

}
