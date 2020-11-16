import { environment } from './../../environments/environment';
import { CheckoutComponent } from './../checkout/checkout.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  userToken = "";
  userName = "";
  roleId = "";

  constructor(private httpClient: HttpClient,private dialog: MatDialog) {}

  getCurrWallet() {
    this.checkUserStatus();
    return localStorage.getItem('currWallet')
  }
  
  loggedIn() {
    this.checkUserStatus();
    return localStorage.getItem('userToken');
  }

  existingOrder() {
    return localStorage.getItem('orderId');
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    localStorage.removeItem('currWallet');

    this.checkUserStatus();

  }
  
  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'user/getSpecific/' + localStorage.getItem('userId'), {}).subscribe((res2: any) =>{
      localStorage.setItem('currWallet', res2.wallet)
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
    


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      width: '1200px',
      height: '850px',
      data: ''
    });
  }

  displayMenu(): void{
    this.trigger.openMenu();
  }

  hideMenu(): void{
    this.trigger.closeMenu();
  }

}
