import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'user-bought',
  templateUrl: './user-bought.component.html',
  styleUrls: ['./user-bought.component.css']
})
export class UserBoughtComponent implements OnInit{
  userId = localStorage.getItem("userId");
  tableData : string [];
  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'item/getTranBou/' + this.userId, {
    }).subscribe(data => {
        this.tableData = data as string[];
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
  }
  
  updateTable(){
    this.httpClient.get(environment.endpointURL + 'item/getTranBou/' + this.userId, {
    }).subscribe(data => {
        this.tableData = data as string[];
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
  
  }

}


