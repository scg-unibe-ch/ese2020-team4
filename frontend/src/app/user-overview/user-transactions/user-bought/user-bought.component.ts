import { Item } from './../../../models/item.model';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Observable, timer, Subscription } from 'rxjs';
import {MatTableDataSource,MatTable} from '@angular/material/table';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {DeleteDialogComponent} from "../../../admin-overview/user-list/delete-dialog/delete-dialog.component";
import {RatingDialogComponent} from "./rating-dialog/rating-dialog.component";

@Component({
  selector: 'user-bought',
  templateUrl: './user-bought.component.html',
  styleUrls: ['./user-bought.component.css']
})
export class UserBoughtComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['Title', 'TransactionType', 'Location', 'Status', 'Description','Price', 'Price Model', 'Options'];
  userId = localStorage.getItem("userId");
  tableData : string [];
  locData;
  everyFiveSeconds: Observable<number> = timer(0, 15000);
  subscription : Subscription;
  dataSource = new MatTableDataSource();
  constructor(private httpClient: HttpClient, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('itemTable') itemTable: MatTable<Item>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'item/getTranBou/' + this.userId, {
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
    this.httpClient.get(environment.endpointURL + 'item/getTranBou/' + this.userId, {
    }).subscribe(data => {
      this.dataSource.data = data as Item[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
    this.itemTable.renderRows();

  }


  openDialog(itemId: any) {

    this.dialog.open(RatingDialogComponent, {
      width: '250px',
      data: itemId
    });
  }
}


