import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class UserItemListComponent implements OnInit{
  userId = localStorage.getItem("userId");
  newUserItemName = '';
  tableData : string [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'item/get/' + this.userId, {
    }).subscribe(data => {
        this.tableData = data as string[];
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
  }
  
  updateTable(){
    this.httpClient.get(environment.endpointURL + 'item/get/' + this.userId, {
    }).subscribe(data => {
        this.tableData = data as string[];
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
  
  }
}


