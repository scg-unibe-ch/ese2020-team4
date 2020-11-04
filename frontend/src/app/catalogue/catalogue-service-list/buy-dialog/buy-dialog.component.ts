import { ItemData } from '../catalogue-service-list.component';
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
export class BuyServiceComponent {
  itemForm: FormGroup;
  public constructor(public dialogRef: MatDialogRef<BuyServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemData, private httpClient: HttpClient) {
  }
  secureEndpointResponse = '';
  hide = true;
  userId;


  buyProduct(): void {
    if(localStorage.getItem('userId') == null){
      this.dialogRef.close();
      this.moveToSelectedTab('Login');
    }
    else{
      this.userId = localStorage.getItem('userId')
      console.log(this.data)
      this.httpClient.put(environment.endpointURL + 'item/buy/'+this.data+ "/"+ this.userId, null).subscribe((res: any) => { });
      this.dialogRef.close()
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
