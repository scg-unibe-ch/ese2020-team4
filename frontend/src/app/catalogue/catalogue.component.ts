import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {


  constructor(private httpClient: HttpClient) { }


}
