import { ApprovmentAllDialogComponent } from './approvmentAll-dialog/approvementAll-dialog.component';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription, timer} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {User} from "../../models/user.model";
import {MatPaginator} from "@angular/material/paginator";
import {environment} from "../../../environments/environment";
import {Item} from "../../models/item.model";
import {ApprovmentDialogComponent} from "./approvment-dialog/approvment-dialog.component";
import {DeleteItemDialogComponent} from "./delete-item-dialog/delete-item-dialog.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

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
  @ViewChild('itemTable') itemTable: MatTable<Item>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'item/getAllItems', {
    }).subscribe(data => {
        this.locData = data as Item[];
        this.dataSource = new MatTableDataSource(data as Item[]);
        this.changeDetectorRefs.detectChanges();
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
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
    this.httpClient.get(environment.endpointURL + 'item/getAllItems', {
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
    this.dialog.open(ApprovmentDialogComponent, {
      width: '250px',
      data: itemId
    });
  }

  approveAllDialog(): void {
    this.dialog.open(ApprovmentAllDialogComponent, {
      width: '250px',
      data: ""
    });
  }

  deleteDialog(itemId: any) {
    this.dialog.open(DeleteItemDialogComponent, {
      width: '250px',
      data: itemId
    });
  }
}
