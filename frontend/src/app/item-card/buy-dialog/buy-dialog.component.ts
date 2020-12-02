import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemData} from "../../catalogue/catalogue-service-list/catalogue-service-list.component";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.css']
})
export class BuyComponent {
  itemForm: FormGroup;
  public constructor(public dialogRef: MatDialogRef<BuyComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: ItemData, private httpClient: HttpClient,
                     private router: Router) {
  }
  secureEndpointResponse = '';
  hide = true;
  userId;
  orderId: any;


  buyProduct(): void {

    if(localStorage.getItem('userId') == null){
      this.dialogRef.close();
      this.router.navigate(['/login']);
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

}
