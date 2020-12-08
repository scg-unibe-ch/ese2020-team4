import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsItemDelete } from './delete-dialog/products-item-delete.component';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator'
import { Observable, timer, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProductsFormComponent } from './edit-product-form/edit-products-form.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
import { Item } from './../../../models/item.model';

export interface ItemData {
  item: any;
}

/**
 * component that contains the product list of user
 */

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})



export class UserItemListComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['Title', 'TransactionType', 'Location', 'Status', 'Description','Price', 'Price Model', 'Options'];
  userId = localStorage.getItem("userId");
  itemId = 0;
  item : any;
  newUserItemName = '';
  locData;
  everyFiveSeconds: Observable<number> = timer(0, 15000);
  subscription : Subscription;
  dataSource = new MatTableDataSource();
  constructor(private httpClient: HttpClient, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('itemTable') itemTable: MatTable<Item>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'item/get/' + this.userId, {
    }).subscribe(data => {
         console.log(data)
        this.locData = data as Item[];
        this.dataSource = new MatTableDataSource(data as Item[]);
        this.changeDetectorRefs.detectChanges();
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    }
    );
    this.subscription = this.everyFiveSeconds.subscribe(()=> {
      this.refresh();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refresh(): void{
    this.httpClient.get(environment.endpointURL + 'item/get/'+ this.userId, {
    }).subscribe(data => {
      this.dataSource.data = data as Item[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
    this.itemTable.renderRows();

  }

  deleteItem(itemId){
    this.itemId = itemId
    const dialogRef = this.dialog.open(ProductsItemDelete, {
      width: '250px',
      data: this.itemId
    });
  }

  editDialog(item): void {
    this.item = item
    const dialogRef = this.dialog.open(EditProductsFormComponent, {
      width: '250px',
      data: this.item
    });
  }
  postDialog(): void {
    const dialogRef = this.dialog.open(ProductsFormComponent, {
      width: '320px',
    });
  }
}


