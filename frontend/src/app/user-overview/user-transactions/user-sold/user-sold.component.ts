import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'user-sold',
  templateUrl: './user-sold.component.html',
  styleUrls: ['./user-sold.component.css']
})
export class UserSoldComponent implements OnInit{
  userId = localStorage.getItem("userId");
  tableData : string [];
  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'item/getTranSol/' + this.userId, {
    }).subscribe(data => {
        this.tableData = data as string[];
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
  }
  
  updateTable(){
    this.httpClient.get(environment.endpointURL + 'item/getTranSol/' + this.userId, {
    }).subscribe(data => {
        this.tableData = data as string[];
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
  
  }

}


