import { BuyDialogComponent } from './../catalogue/catalogue-product-list/buy-dialog/buy-dialog.component';
import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../models/item';
import {BuyServiceComponent} from "../catalogue/catalogue-service-list/buy-dialog/buy-dialog.component";
import {MatDialog} from "@angular/material/dialog";
<<<<<<< HEAD

=======
import {BuyDialogComponent} from "../catalogue/catalogue-product-list/buy-dialog/buy-dialog.component";
>>>>>>> 07db221c8f129806f94de356f3f6d27a8be5aa1d

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input()
  item: Item = new Item(null,null,null,null,null,null,null, null);

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(itemId): void {
    itemId = itemId
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '250px',
      data: itemId
    });
  }
}
