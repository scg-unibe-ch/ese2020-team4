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
  orderId;
  userId;


  buyProduct(): void {
    if(localStorage.getItem('userId') == null){
      this.dialogRef.close();
      this.moveToSelectedTab('Login');
    }
    else{
      this.userId = localStorage.getItem('userId')
      this.orderId = localStorage.getItem('orderId')
      if (!localStorage.getItem('orderId')){
        this.httpClient.post(environment.endpointURL + 'order/post', {userId: this.userId, status: "active"}).subscribe((res: any) => {
          localStorage.setItem('orderId', res.orderId)
          this.orderId = localStorage.getItem('orderId')
          this.httpClient.put(environment.endpointURL + 'item/buy/'+this.data+ "/"+ this.orderId, null).subscribe((res: any) => { });
        });
        this.dialogRef.close()
      } else {
        this.orderId = localStorage.getItem('orderId')
        this.httpClient.put(environment.endpointURL + 'item/buy/'+this.data+ "/"+ this.orderId, null).subscribe((res: any) => { });
        this.dialogRef.close()
      }
      
    }
  }

  close(): void{
    this.dialogRef.close()
  }

  moveToSelectedTab(tabName: string) {
    for (let i =0; i < document.querySelectorAll('.mat-tab-label').length; i++) {
      if ((<HTMLElement> document.querySelectorAll('.mat-tab-label')[i]).innerText === tabName) {
        (<HTMLElement> document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }
}
