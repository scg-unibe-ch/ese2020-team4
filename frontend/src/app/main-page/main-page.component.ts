import { environment } from './../../environments/environment';
import { CheckoutComponent } from './../checkout/checkout.component';
import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  userToken = "";
  userName = "";
  roleId = "";



  constructor(private httpClient: HttpClient,private route: ActivatedRoute,) {}

  loggedIn() {
    this.checkUserStatus();
    return localStorage.getItem('userToken');
  }


  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('orderId');
    localStorage.removeItem('roleId');

    this.checkUserStatus();

  }

  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'user/getWallet/' + localStorage.getItem('userId'), {}).subscribe((res2: any) =>{
    localStorage.setItem('currWallet', res2.wallet)
    });
    this.httpClient.get(environment.endpointURL + 'order/getCount/' + localStorage.getItem('userId'), {}).subscribe((res: any) =>{
    localStorage.setItem('orderSize', res)
    });
  }

  isAdmin(): boolean {
    return Number(this.roleId) === 1;
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.roleId = localStorage.getItem('roleId');
    this.httpClient.get(environment.endpointURL + 'user/getSpecific/' + localStorage.getItem('userId'), {}).subscribe((res: any) =>{
      localStorage.setItem('userName', res.userName);
    },(err: any) => {console.log('error no user found')});

  }


  displayMenu(): void{
    this.trigger.openMenu();
  }

  hideMenu(): void{
    this.trigger.closeMenu();
  }
}
