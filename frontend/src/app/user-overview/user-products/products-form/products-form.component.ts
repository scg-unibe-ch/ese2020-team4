import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  itemForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  secureEndpointResponse = '';
  hide = true;
  
  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      userId: [localStorage.getItem('userId').toString()],
      name: [''],
      category: [''],
      description: [''],
      price: ['']
    })
  }

  post(): void {
    console.log(environment.endpointURL)
    console.log(this.itemForm.value)
    this.httpClient.post(environment.endpointURL + 'item/post', this.itemForm.value).subscribe((res: any) => { });
  }

  validForm(): boolean {
    // checks if form is valid
    if (this.itemForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

}