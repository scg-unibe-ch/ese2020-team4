import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';

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

  constructor(private httpClient: HttpClient) {}

  loggedIn() {
    this.checkUserStatus();
    return localStorage.getItem('userToken');
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
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

  displayMenu(): void{
    this.trigger.openMenu();
  }

  hideMenu(): void{
    this.trigger.closeMenu();
  }

}
