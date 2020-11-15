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


  searchString: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  postalService: boolean;
  pickUp: boolean;
  available: boolean;
  buy: boolean;
  rent: boolean;



  attachOutsideOnClick = true;

  min;
  max;

  value: number = 40;
  highValue: number = 60;
  options: Options;







  constructor(private httpClient: HttpClient ) {

    this.min = 0;
    this.max = 1000;
    this.options = {
      floor: this.min,
      ceil: this.max
    };
  }

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'item/getPro/').subscribe((instances: any) => {
      this.itemList = instances.map((instance: any) => {
        return new Item(instance.itemId, instance.title, instance.description, instance.location, instance.price)
      })

      this.itemListFiltered = this.itemList;
      this.maxPrice = this.getMax(this.itemListFiltered);
      this.minPrice = this.getMin(this.itemListFiltered);

      console.log(this.minPrice);
      console.log(this.maxPrice);


    });






  }





  onClickFilter() {

    console.log(this.searchString)
    this.itemListFiltered =  this.itemList.filter(i =>
      i.itemId > 50 && (i.title.includes(this.searchString) || i.description.includes(this.searchString)
      ))





    // console.log(this.itemList)
    // this.itemListFiltered = [];
    //
    // console.log(1);


    // const array3 = this.itemList;
    // const obsfrom1 = from(array3);
    // obsfrom1.pipe(filter(data => data.itemId > 50)).subscribe(instance =>
    //   this.itemListFiltered.push(instance),
    //   error => console.log('error'),
    //   () => console.log('complete'));

  }


  onClickedOutside(e: Event) {

    console.log('test')


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




}
