import { DeleteOrderItem } from './delete-order-item/delete-order-item.component';
import { Observable, timer, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import { Item } from '../../models/item.model';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog,  } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component,Output, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { environment } from '../../../environments/environment';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

export interface ItemData {
  item: any;
}

@Component({
  selector: 'checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy{
  userId = localStorage.getItem("userId");
  itemId = 0;
  newUserItemName = '';
  locData;
  everyFiveSeconds: Observable<number> = timer(0, 15000);
  subscription : Subscription;
  dataSource = new MatTableDataSource();
  cost;
  orderId;
  vatCost;
  finalCost;
  
  constructor(private httpClient: HttpClient, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('itemTable') itemTable: MatTable<Item>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(){
    this.httpClient.get(environment.endpointURL + 'item/getOrderItem/'+ localStorage.getItem('orderId'), {
    }).subscribe(data => {
        this.locData = data as Item[];
        this.dataSource = new MatTableDataSource(data as Item[]);
        this.changeDetectorRefs.detectChanges();
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
    this.changePrice()
    this.subscription = this.everyFiveSeconds.subscribe(()=> {
      this.refresh();
    })
    
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refresh(): void{
    this.httpClient.get(environment.endpointURL + 'item/getOrderItem/'+ localStorage.getItem('orderId'), {
    }).subscribe(data => {
      this.locData = data as Item[];
      this.dataSource.data = data as Item[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: HttpErrorResponse) => {
        console.log(err.message)
    });
    this.changePrice()
    this.itemTable.renderRows();
  
  }

  openDialog(itemId): void {
    this.itemId = itemId
    const dialogRef = this.dialog.open(DeleteOrderItem, {
      width: '250px',
      data: this.itemId
    });
  }

  calculateCost(): number {
    this.cost = 0
    for (let key in this.locData) {
      let value = this.locData[key]
      this.cost += value.price
    }

    return this.cost
  }

  calculateBCCosts() : number {
    this.calculateCost(); 
    this.vatCost = this.cost *1.2
    this.finalCost = this.vatCost * 0.00010219254
    return this.finalCost;
  }

  public changePrice(): void {
    this.httpClient.put(environment.endpointURL + 'order/change/'+ localStorage.getItem("orderId"), {price: this.calculateBCCosts()}).subscribe((res:any) =>{})
  }


}


