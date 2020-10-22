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


  ngOnInit(): void {
    this.checkUserStatus();
    console.log(this.userName)
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

  }
}
