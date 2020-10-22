import { ItemData } from '../catalogue-products-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.css']
})
export class BuyDialogComponent {
  itemForm: FormGroup;
  public constructor(public dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemData, private httpClient: HttpClient) { 
  }
  secureEndpointResponse = '';
  hide = true;
  userId;


  buyProduct(): void {
    this.userId = localStorage.getItem('userId')
    console.log(this.data)
    this.httpClient.put(environment.endpointURL + 'item/buy/'+this.data+ "/"+ this.userId, null).subscribe((res: any) => { });
    this.dialogRef.close()
  }
  close(): void{
    this.dialogRef.close()
  }
}
