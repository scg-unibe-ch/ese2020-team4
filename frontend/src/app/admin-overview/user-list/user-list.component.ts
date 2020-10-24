import { Observable, timer, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import { Item } from '../../models/item.model';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { environment } from '../../../environments/environment';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {User} from "../../models/user.model";



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  // displayedColumns: string[] = ['UserId', 'roleId', 'email', 'username', 'firstname', 'lastname', 'gender', 'city'];
  // userId = localStorage.getItem("userId");
  // itemId = 0;
  // newUserItemName = '';
  locData;
  everyFiveSeconds: Observable<number> = timer(0, 15000);
  subscription: Subscription;
  dataSource = new MatTableDataSource();
  constructor(private httpClient: HttpClient, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('userTable') userTable: MatTable<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'user/getAllwithoutAdmin', {
    }).subscribe(data => {
        this.locData = data as User[];
        this.dataSource = new MatTableDataSource(data as User[]);
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
    this.httpClient.get(environment.endpointURL + 'user/getAllwithoutAdmin/', {
    }).subscribe(data => {
      this.dataSource.data = data as User[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: HttpErrorResponse) => {
      console.log(err.message)
    });
    this.userTable.renderRows();

  }

  openDialog(userId): void {
    //this.itemId = itemId
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: userId
    });
  }

}





