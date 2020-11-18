import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {from} from "rxjs";
import {filter} from "rxjs/operators";
import { Options } from "@angular-slider/ngx-slider";



export interface ItemData {
  item: any;
}

@Component({
  selector: 'catalogue-products-list',
  templateUrl: './catalogue-products-list.component.html',
  styleUrls: ['./catalogue-products-list.component.css']
})
export class CatalogueProductsListComponent implements OnInit{

  itemList: Item[] = [];
  itemListFiltered: Item[] = [];


  searchString = '';
  location = '';
  delivery = false;
  available: boolean; //change backend first!
  itemRank: number;
  sell= false;
  rent= false;

  results: number;

  attachOutsideOnClick = true;

  value: number = 0;
  highValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000
  };




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





    });


  }

  onClickReset() {
    this.value = 0;
    this.highValue = 10000;
    this.location = '';
    this.delivery = false;
    this.sell= false;
    this.rent= false;

    this.onClickFilter()
  }





  onClickFilter() {

    var that = this;

    setTimeout(function() {
      that.itemListFiltered = that.itemList.filter(item =>
        (item.title.toLowerCase().includes(that.searchString) || item.description.toLowerCase().includes(this.searchString))
        && (item.location.toLowerCase().includes(that.location))
        && (item.delivery === true || item.delivery === that.delivery)
        && (item.transactionType === that.getTransactionType())
        && (item.price >= that.value && item.price <= that.highValue)
      )

      that.results = that.itemListFiltered.length;



    },1000)

  }


  onClickedOutside(e: Event) {

    this.onClickFilter()


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
      return 'Sell' || 'Rent';
  }

}


