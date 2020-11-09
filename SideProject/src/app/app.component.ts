import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SideProject';
  userName: string;
  Show: string;
  icon: string;
  refresh = true;
  disableLogin = false;
  constructor(private router: Router, private primengConfig: PrimeNGConfig, private confirmationService: ConfirmationService, private appService: AppService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    console.log(sessionStorage);
    this.userName = sessionStorage.getItem('userName');
    this.primengConfig.ripple = true;
    if (!!this.userName) {
      this.Show = 'Welcome, ' + this.userName;
    } 


    // refresh app component to change values of navbar
    this.appService.refreshNeeded$.subscribe({
      next: () => {
        this.ngOnInit();
      }
    });
  }

  logoutConfirm(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to logout?',
      key: 'logOutConfirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (sessionStorage.getItem('contactNo')) {
          // remove userdatils from the sessionStorage
          sessionStorage.removeItem('contactNo');
          sessionStorage.removeItem('userName');
          this.appService.refreshApp();
          this.router.navigate(['/home']);
        }
      }
    });
  }

}
