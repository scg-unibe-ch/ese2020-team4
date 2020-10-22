import { Observable, timer, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import { Item } from './../../models/item.model';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { environment } from '../../../environments/environment';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

export interface ItemData {
  item: any;
}

@Component({
  selector: 'catalogue-products-list',
  templateUrl: './catalogue-products-list.component.html',
  styleUrls: ['./catalogue-products-list.component.css']
})
export class CatalogueProductsListComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['Title', 'TransactionType', 'Location', 'Status', 'Description','Price', 'Price Model', 'Options'];
  userId = localStorage.getItem("userId");
  itemId = 0;
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
    this.httpClient.get(environment.endpointURL + 'item/getPro/', {
    }).subscribe(data => {
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
    this.httpClient.get(environment.endpointURL + 'item/getPro/', {
    }).subscribe(data => {
      this.dataSource.data = data as Item[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
    this.itemTable.renderRows();
  
  }

  openDialog(itemId): void {
    this.itemId = itemId
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '250px',
      data: this.itemId
    });
  }
}


