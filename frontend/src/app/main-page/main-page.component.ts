import { CheckoutComponent } from './../checkout/checkout.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userToken = "";
  userName = "";
  roleId = "";



  constructor(private httpClient: HttpClient,private dialog: MatDialog,private route: ActivatedRoute,) {}

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
    localStorage.removeItem('orderId');
    localStorage.removeItem('roleId');

    this.checkUserStatus();

  }

  ngOnInit(): void {
    this.checkUserStatus();
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
  accessOrder(): void {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      width: '1200px',
      height: '850px',
      data: ''
    });
  }
}
