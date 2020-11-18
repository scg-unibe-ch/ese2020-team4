import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {from} from "rxjs";
import {filter} from "rxjs/operators";
import { Options } from "@angular-slider/ngx-slider";



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  itemList: Item[] = [];
  itemListFiltered: Item[] = [];


  searchString = '';
  location = '';
  delivery = false;
  available: boolean;
  transactionType: string //buy or rent
  itemRank: number;

  results: number;

  attachOutsideOnClick = true;

  value: number = 0;
  highValue: number = 100000;
  options: Options = {
    floor: 0,
    ceil: 100000
  };


  sell= false;
  rent= false;




  constructor(private httpClient: HttpClient ) {


  }



  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'item/getPro/').subscribe((instances: any) => {
      this.itemList = instances.map((instance: any) => {
        return new Item(instance.itemId, instance.title, instance.description, instance.location, instance.price,
          instance.transactionType, instance.delivery, instance.createdAt);
      })

      this.itemListFiltered = this.itemList;
      this.results = this.itemListFiltered.length;

      this.value = this.getMax(this.itemListFiltered);
      this.highValue = this.getMin(this.itemListFiltered);

      this.options.floor = this.value
      this.options.ceil = this.highValue





    });


  }





  onClickFilter() {

    console.log(this.delivery);
    console.log(this.sell);
    console.log(this.rent);
    this.itemListFiltered =  this.itemList.filter(item =>
      (item.title.toLowerCase().includes(this.searchString) || item.description.toLowerCase().includes(this.searchString))
      && (item.location.toLowerCase().includes(this.location))
      && (item.delivery === true || item.delivery === this.delivery)
      && (item.transactionType === this.getTransactionType())
      && (item.price >= this.value && item.price <= this.highValue)
     )

    this.results = this.itemListFiltered.length;


  }


  onClickedOutside(e: Event) {




  }

  getMin(list: Item[]) {

    if(list.length === 0){
     return 0;
    }

    let min = list[0].price

    for(let i = 0; i < list.length; i++){
      if(min > list[i].price){
        min = list[i].price;
      }
    }

    return min;
  }

  getMax(list: Item[]) {

    if(list.length === 0){
      return 0;
    }

    let max = list[0].price;

    for(let i = 0; i < list.length; i++){
      if(max < list[i].price){
        max = list[i].price;
      }
    }

    return max;
  }


  private getTransactionType() {
    if(this.sell === false && this.rent === true )
      return 'Rent';
    else if(this.sell === true && this.rent === false)
      return 'Sell';
    else
      return 'Sell' || 'Rent'
  }
}
