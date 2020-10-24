import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userToken = "";
  userName = "";

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
    return Number(localStorage.getItem('roleId'))  === 1;
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

  }
}
