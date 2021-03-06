import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../models/item';
import {BuyServiceComponent} from "../catalogue/catalogue-service-list/buy-dialog/buy-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BuyComponent} from "./buy-dialog/buy-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
/**
 * Component that defines how items are displayed in catalogue
 */

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input()
  item: Item = new Item(null,null,null,null,null,null,null,null, null,null, null);

  constructor(private dialog: MatDialog, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  openDialog(itemId): void {
    itemId = itemId
    const dialogRef = this.dialog.open(BuyComponent, {
      width: '250px',
      data: itemId
    });
  }


  detailedView(itemId: number, productType: string) {
    if(productType == 'Product'){
      this.router.navigate(['/main/available-products', itemId]);

    }
    else{
      this.router.navigate(['/main/available-services', itemId]);

    }
  }
}
