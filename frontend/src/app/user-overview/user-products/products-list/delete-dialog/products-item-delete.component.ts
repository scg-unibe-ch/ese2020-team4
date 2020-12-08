import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

/**
 * Component with functionality to delete products
 */

@Component({
  selector: 'products-item-delete',
  templateUrl: './products-item-delete.component.html',
  styleUrls: ['./products-item-delete.component.css']
})
export class ProductsItemDelete  {
  public constructor(public dialogRef: MatDialogRef<ProductsItemDelete>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }

  delete(): void {
    this.httpClient.delete(environment.endpointURL + 'item/delete/' + this.data, {
    }).subscribe();
    this.dialogRef.close()
  }
  close(): void{
    this.dialogRef.close()
  }
}
