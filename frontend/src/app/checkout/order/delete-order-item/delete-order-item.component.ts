import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'delete-order-item',
  templateUrl: './delete-order-item.component.html',
  styleUrls: ['./delete-order-item.component.css']
})
export class DeleteOrderItem  {
  public constructor(public dialogRef: MatDialogRef<DeleteOrderItem>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }

  delete(): void {
    this.httpClient.put(environment.endpointURL + 'item/' + this.data, {orderId:null
    }).subscribe();
    this.dialogRef.close()
    localStorage.removeItem('orderId');
  }
  close(): void{
    this.dialogRef.close()
  }
}
