import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../models/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input()
  item: Item = new Item(null,null,null,null,null);

  constructor() { }

  ngOnInit(): void {
  }

}
