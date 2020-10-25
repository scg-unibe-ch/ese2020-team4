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
  constructor() { }

  ngOnInit(): void {
  }


}
