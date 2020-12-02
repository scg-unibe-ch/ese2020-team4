import { Component, OnInit } from '@angular/core';
import { Item } from "../../models/item";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { from } from "rxjs";
import { filter } from "rxjs/operators";
import { Options } from "@angular-slider/ngx-slider";



export interface ItemData {
  item: any;
}

@Component({
  selector: 'catalogue-products-list',
  templateUrl: './catalogue-products-list.component.html',
  styleUrls: ['./catalogue-products-list.component.css']
})
export class CatalogueProductsListComponent implements OnInit {

  itemList: Item[] = [];
  itemListFiltered: Item[] = [];


  searchString = '';
  imageSearchString = '';
  location = '';
  delivery = false;
  available: boolean; //change backend first!
  itemRank: number;
  sell = false;
  lend = false;

  maxPrice: number;
  minPrice: number;


  results: number;

  sortBy = '';

  attachOutsideOnClick = true;

  value: number = 0;
  highValue: number = 10000;
  options: Options = {
    floor: this.value,
    ceil: this.highValue
  };

  constructor(private httpClient: HttpClient) {


  }

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'item/getPro/').subscribe((instances: any) => {
      this.itemList = instances.map((instance: any) => {
        return new Item(instance.itemId, instance.title, instance.description, instance.location, instance.price,
          instance.transactionType, instance.delivery, instance.createdAt, instance.encodedPicture, instance.jsonstring);
      })

      this.itemListFiltered = this.itemList;
      this.results = this.itemListFiltered.length;

      this.minPrice = this.getMin(this.itemList);
      this.maxPrice = this.getMax(this.itemList);

      this.value = this.getMin(this.itemListFiltered);
      this.highValue = this.getMax(this.itemListFiltered);

      this.onClickSortMostRecent();



    });


  }

  onClickReset() {
    this.value = this.minPrice;
    this.highValue = this.maxPrice;
    this.location = '';
    this.delivery = false;
    this.sell = false;
    this.lend = false;

    this.onClickFilter();
  }





  onClickFilter() {

    var that = this;

    setTimeout(function () {
      that.itemListFiltered = that.itemList.filter(item =>
        (item.title.toLowerCase().includes(that.searchString.toLowerCase())
          || item.description.toLowerCase().includes(that.searchString.toLowerCase()))
        // && (item.labels.toLowerCase().includes(that.imageSearchString.toLowerCase()))
        && (item.location.toLowerCase().includes(that.location.toLowerCase()))
        && (item.delivery === true || item.delivery === that.delivery)
        && (that.getTransactionType().includes(item.transactionType))
        && (item.price >= that.value && item.price <= that.highValue)
      )

      that.results = that.itemListFiltered.length;

      console.log('filter')





    }, 1000)

  }


  getMin(list: Item[]) {

    if (list.length === 0) {
      return 0;
    }

    let min = list[0].price

    for (let i = 0; i < list.length; i++) {
      if (min > list[i].price) {
        min = list[i].price;
      }
    }

    return min;
  }

  getMax(list: Item[]) {

    if (list.length === 0) {
      return 0;
    }

    let max = list[0].price;

    for (let i = 0; i < list.length; i++) {
      if (max < list[i].price) {
        max = list[i].price;
      }
    }

    return max;
  }


  private getTransactionType() {
    if (this.sell === false && this.lend === true)
      return 'Lend';
    else if (this.sell === true && this.lend === false)
      return 'Sell';
    else
      return ['Sell', 'Lend'];
  }

  onClickSortHighest() {
    this.itemListFiltered.sort((a, b) => (a.price >= b.price ? -1 : 1));
    this.sortBy = 'Price: High to Low';

  }


  onClickSortLowest() {

    this.itemListFiltered.sort((a, b) => (a.price < b.price ? -1 : 1));
    this.sortBy = 'Price: Low to High';

  }

  onClickSortMostRecent() {
    this.itemListFiltered.sort((a, b) => (a.date >= b.date ? -1 : 1));
    this.sortBy = 'Most recent products';
  }
}


