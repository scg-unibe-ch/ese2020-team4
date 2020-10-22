import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProductsFormComponent } from './edit-product-form/edit-products-form.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

export interface ItemData {
  item: any;
}

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class UserItemListComponent implements OnInit{
  userId = localStorage.getItem("userId");
  itemId = 0;
  item : any;
  newUserItemName = '';
  tableData : string [];
  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

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

  deleteItem(itemId){
    this.itemId = itemId
    this.httpClient.delete(environment.endpointURL + 'item/delete/' + this.itemId, {
    }).subscribe();
  }

  openDialog(item): void {
    this.item = item
    const dialogRef = this.dialog.open(EditProductsFormComponent, {
      width: '250px',
      data: this.item
    });
  }
}


