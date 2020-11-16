import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.css']
})
export class UserWalletComponent implements OnInit {
  wallet = '';
  currwallet;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  getAccountBalance(): number {
    this.httpClient.get(environment.endpointURL + 'user/getSpecific/' + localStorage.getItem('userId'), {}).subscribe((res: any) =>{
      this.currwallet = res.wallet;
      localStorage.setItem('currWallet', res.wallet)
    });
    return this.currwallet;
  }

  
  chargeAccount(): void {

    this.httpClient.put(environment.endpointURL + 'user/charge/'+ localStorage.getItem('userId'), {"wallet" : this.wallet}).subscribe((res:any) =>{
      this.getAccountBalance();
    })
  }
  
}
