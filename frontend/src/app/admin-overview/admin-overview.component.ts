import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * The Admin Panel consisting of two tabs
 */

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})

export class AdminOverviewComponent{


  constructor(private httpClient: HttpClient) { }


}
