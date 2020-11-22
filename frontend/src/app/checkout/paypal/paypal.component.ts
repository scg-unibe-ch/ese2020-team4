import { MatDialogRef } from '@angular/material/dialog';
import { environment } from './../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit, Inject, ViewChild, ElementRef, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';


declare var paypal;



@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit  {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;


  @Input() orderPrice: number;
  @Input() dialogRef: MatDialogRef<any>;

  paidFor = false;
  shippingAddress: FormGroup;
  
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    paypal.Buttons({
      
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "ESE2020 Order",
                amount: {
                  currency_code: 'USD',
                  value: this.orderPrice
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.finalizeTransaction();
          
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);

  }

  finalizeTransaction(): void {
    this.httpClient.put(environment.endpointURL + 'order/change/'+ localStorage.getItem('orderId'), {status: "complete"}).subscribe((res: any) => {});
    this.httpClient.put(environment.endpointURL + 'item/completeTransaction/'+ localStorage.getItem('userId')+"/"+localStorage.getItem("orderId"), null).subscribe((res: any) => {});
    localStorage.removeItem("orderId")
    this.dialogRef.close()
  }
}

