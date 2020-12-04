import { defaultPicture } from './../../../../backend/src/public/images/defaultPicture';
import { environment } from './../../environments/environment';
import { CheckoutComponent } from './../checkout/checkout.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


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
  picture = "";
  NoCustomIcon = true;

  constructor(private httpClient: HttpClient,private dialog: MatDialog, private router: Router) {}

  getCurrWallet() {
    this.checkUserStatus();
    return localStorage.getItem('currWallet')
  }

  getCurrOrderSize() {
    this.checkUserStatus();
    return localStorage.getItem('orderSize')
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
    localStorage.removeItem('orderId');
    localStorage.removeItem('currWallet');
    localStorage.removeItem('orderSize');
    localStorage.removeItem('picture');

    this.checkUserStatus();
    
    //After Logout to Main
    this.router.navigateByUrl('/main/available-products');
  }
  
  ngOnInit(): void {
    this.checkUserStatus();
    this.picture = localStorage.getItem('picture')
  }

  isAdmin(): boolean {
    return Number(this.roleId) === 1;
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.roleId = localStorage.getItem('roleId');
    if (localStorage.getItem('picture') != defaultPicture.base64Value) {
      this.NoCustomIcon = false;
      this.picture = localStorage.getItem('picture')
    }
    

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
