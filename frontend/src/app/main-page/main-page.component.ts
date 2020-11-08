import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
<<<<<<< HEAD

  displayMenu(): void{
    this.trigger.openMenu();
  }

  hideMenu(): void{
    this.trigger.closeMenu();
  }
=======
  
>>>>>>> 5189491895f248181f4a7dd0480874a39905bab8
}
