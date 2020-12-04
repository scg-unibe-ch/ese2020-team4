import { defaultPicture } from './../../../../backend/src/public/images/defaultPicture';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DeleteDialogComponent } from "../admin-overview/user-list/delete-dialog/delete-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ResetDialogComponent } from "./reset-dialog/reset-dialog.component";
import { Router } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {



  constructor(private httpClient: HttpClient, private dialog: MatDialog, private router: Router) {


  }

  userName = '';
  userId = '';
  password = '';
  orderId = null;
  NoCustomIcon = false;
  picture = ""

  userToken: string;
  loggedIn = false;
  admin = false;
  roleId = '';

  secureEndpointResponse = '';



  getUserName(): string {
    return this.userName;
  }

  getToken(): string {
    return this.userToken;
  }

  setUserName(userName: string): void {
    this.userName = userName;
  }

  setPassword(password: string): void {
    this.password = password;
  }




  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    if (localStorage.getItem('picture') != defaultPicture.base64Value) {
      this.NoCustomIcon = false;
      this.picture = localStorage.getItem('picture')
    }

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);

    //this.isAdmin();


  }


  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      userId: this.userId,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('userId', res.user.userId);
      localStorage.setItem('roleId', res.user.roleId);
      localStorage.setItem('currWallet', res.user.wallet);
      localStorage.setItem('picture', res.user.encodedPicture)
      this.checkUserStatus();
      this.router.navigateByUrl('/main/available-products');
      this.httpClient.get(environment.endpointURL + 'order/getUserOrder/' + localStorage.getItem('userId'), {
      }).subscribe((res: any) => {
        if (res.orderId != undefined) {
          localStorage.setItem('orderId', res.orderId)
          localStorage.setItem('orderSize', res.count)
        }
      })
    }, (err: any) => {

      this.openDialogError('Wrong username or password');

    });

  }

  loggedInMethod(): string {
    return localStorage.getItem('userToken');
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    localStorage.removeItem('orderId');
    localStorage.removeItem('currWallet');
    localStorage.removeItem('picture');

    this.checkUserStatus();

  }


  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }

  moveToSelectedTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).innerText === tabName) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }


  reset() {
    this.dialog.open(ResetDialogComponent, {
      width: '250px'
    });
  }

  private openDialogError(message) {
    this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: message
    });
  }

}
