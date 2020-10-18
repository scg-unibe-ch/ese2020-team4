import {Component, OnChanges, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userName =  '';
  userId = '';
  password = '';

  userToken: string;
  loggedIn = false;

  secureEndpointResponse = '';


  constructor(private httpClient: HttpClient) {

  }


  getUserName(): string {
    return this.userName;
  }

  getToken(): string {
    return this.userToken;
  }

  setUserName(userName: string): void{
    this.userName = userName;
  }

  setPassword(password: string): void{
    this.password = password;
  }




  ngOnInit(): void {
    this.checkUserStatus();
  }

  // ngOnChanges(): void {
  //   this.checkUserStatus();
  // }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
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

      this.checkUserStatus();
    });
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

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


  newUser(): void {
    (<HTMLElement> document.querySelectorAll('.mat-tab-label')[2]).click(); // not safe for changes!
  }


  test(): string {
    return 'test123';
  }

  loggedInMethod(): string {
    return localStorage.getItem('userToken');
  }


}
